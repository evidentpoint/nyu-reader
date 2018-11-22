import React, { CSSProperties, ReactNode } from 'react';

import {
  IFrameLoader,
  Publication,
  R2ContentViewFactory as ContentViewFactory,
  Rendition,
  RenditionContext,
  SpreadMode,
  ScrollMode,
} from '@evidentpoint/r2-navigator-web';

import { ViewportResizer } from './viewport-resizer';

export interface IReadiumViewProps {
  style?: CSSProperties;
  enableScroll: boolean;
  viewAsVertical: boolean;
  onRenditionCreated(rendCtx: RenditionContext): void;
}

export class ReadiumView extends React.Component<IReadiumViewProps, {}> {

  private root: HTMLElement | null = null;
  private viewportRoot: HTMLElement | null = null;

  private rendContext? : RenditionContext;

  private publication?: Publication;

  private resizer?: ViewportResizer;

  private viewportWidth: number = 0;
  private viewportHeight: number = 0;

  constructor(props: IReadiumViewProps) {
    super(props);
    this.updateRoot = this.updateRoot.bind(this);
    this.updateViewportRoot = this.updateViewportRoot.bind(this);
    this.updateSize = this.updateSize.bind(this);
  }

  public render(): ReactNode {
    const containerStyle: CSSProperties = {
      position: 'relative',
    };

    Object.assign(containerStyle, this.props.style);

    return (
      <div style={ containerStyle }
        ref={ this.updateRoot }>
        <div id="viewport" ref={ this.updateViewportRoot }
             style={{ position: 'absolute' }}/>
      </div>
    );
  }

  public componentDidMount(): void {
    this.updateSize();
  }

  public componentWillUnmount(): void {
    this.cleanupResizer();
  }

  public openPublication(pub: Publication): void {
    if (!this.root || !this.viewportRoot) {
      return;
    }
    this.publication = pub;

    const loader = new IFrameLoader(this.publication.getBaseURI());
    loader.setReadiumCssBasePath('/assets/readium-css');

    const cvf = new ContentViewFactory(loader);
    const rend = new Rendition(this.publication, this.viewportRoot, cvf);
    rend.setViewAsVertical(this.props.viewAsVertical);

    const viewportSize = this.props.viewAsVertical ? this.viewportHeight :
                                                      this.viewportWidth;
    const viewportSize2nd = this.props.viewAsVertical ? this.viewportWidth :
                                                        this.viewportHeight;

    rend.viewport.setViewportSize(viewportSize, viewportSize2nd);
    rend.viewport.setPrefetchSize(Math.ceil(viewportSize * 0.1));
    rend.setPageLayout({
      spreadMode: SpreadMode.FitViewportDoubleSpread,
      pageWidth: 0,
      pageHeight: 0,
    });

    rend.render();
    rend.viewport.setScrollMode(this.props.enableScroll ? ScrollMode.Publication : ScrollMode.None);

    this.rendContext = new RenditionContext(rend, loader);

    this.cleanupResizer();
    this.resizer = new ViewportResizer(this.root, this.rendContext, this.updateSize);

    this.props.onRenditionCreated(this.rendContext);
  }

  private updateRoot(root: HTMLElement | null): void {
    this.root = root;
  }

  private updateViewportRoot(viewportRoot: HTMLElement | null): void {
    this.viewportRoot = viewportRoot;
  }

  private cleanupResizer(): void {
    if (this.resizer) {
      this.resizer.stopListenResize();
    }
  }

  private updateSize(): void {
    if (!this.root || !this.viewportRoot) {
      return;
    }

    this.viewportRoot.style.width = `${this.root.clientWidth}px`;
    this.viewportRoot.style.height = `${this.root.clientHeight}px`;

    const scrollerWidthAdj = this.props.enableScroll ? 15 : 0;
    this.viewportWidth = this.root.clientWidth - scrollerWidthAdj;
    this.viewportHeight = this.root.clientHeight;

    if (this.rendContext) {
      const viewportSize = this.props.viewAsVertical ? this.viewportHeight : this.viewportWidth;
      const viewportSize2nd = this.props.viewAsVertical ? this.viewportWidth : this.viewportHeight;
      this.rendContext.rendition.viewport.setViewportSize(viewportSize, viewportSize2nd);
      this.rendContext.rendition.refreshPageLayout();
    }
  }
}
