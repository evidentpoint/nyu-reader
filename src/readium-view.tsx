import React, { CSSProperties, ReactNode } from 'react';

import {
  IFrameLoader,
  Publication,
  R2ContentViewFactory as ContentViewFactory,
  Rendition,
  RenditionContext,
  SpreadMode,
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

  private rendContext? : RenditionContext;

  private publication?: Publication;

  private resizer?: ViewportResizer;

  private viewportWidth: number = 0;
  private viewportHeight: number = 0;

  constructor(props: IReadiumViewProps) {
    super(props);
    this.updateRoot = this.updateRoot.bind(this);
  }

  public render(): ReactNode {
    return (
      <div style={ this.props.style }
        ref={ this.updateRoot }></div>
    );
  }

  public componentDidMount(): void {
    if (!this.root) {
      return;
    }

    const scrollerWidthAdj = this.props.enableScroll ? 15 : 0;

    this.viewportWidth = this.root.clientWidth - scrollerWidthAdj;
    this.viewportHeight = this.root.clientHeight;
  }

  public componentWillUnmount(): void {
    this.cleanupResizer();
  }

  public openPublication(pub: Publication): void {
    if (!this.root) {
      return;
    }
    this.publication = pub;

    const loader = new IFrameLoader(this.publication.getBaseURI());
    loader.setReadiumCssBasePath('/assets/readium-css');

    const cvf = new ContentViewFactory(loader);
    const rend = new Rendition(this.publication, this.root, cvf);
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
    rend.viewport.enableScroll(this.props.enableScroll);

    this.rendContext = new RenditionContext(rend, loader);

    this.cleanupResizer();
    this.resizer = new ViewportResizer(this.root, this.rendContext);

    this.props.onRenditionCreated(this.rendContext);
  }

  private updateRoot(root: HTMLElement | null): void {
    this.root = root;
  }

  private cleanupResizer(): void {
    if (this.resizer) {
      this.resizer.stopListenResize();
    }
  }
}
