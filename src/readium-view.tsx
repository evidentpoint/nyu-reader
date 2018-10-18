import React, { ReactNode } from 'react';

import {
  IFrameLoader,
  Publication,
  R2ContentViewFactory as ContentViewFactory,
  Rendition,
  SpreadMode } from '@evidentpoint/r2-navigator-web';

export interface IReadiumViewProps {
  enableScroll: boolean;
  viewAsVertical: boolean;
  onRenditionCreated(rend: Rendition): void;
}

export class ReadiumView extends React.Component<IReadiumViewProps, {}> {

  private root: HTMLElement | null = null;

  private rendition?: Rendition;

  private publication?: Publication;

  private viewportWidth: number = 0;
  private viewportHeight: number = 0;

  constructor(props: IReadiumViewProps) {
    super(props);
    this.updateRoot = this.updateRoot.bind(this);
  }

  public render(): ReactNode {
    const readerStyle = {
      height: '100%',
    };

    return (
      <div style={ readerStyle }
        ref={ this.updateRoot }></div>
    );
  }

  public componentDidMount(): void {
    if (!this.root) {
      return;
    }

    this.viewportWidth = this.root.clientWidth;
    this.viewportHeight = this.root.clientHeight;
  }

  public openPublication(pub: Publication): void {
    if (!this.root) {
      return;
    }
    this.publication = pub;

    const loader = new IFrameLoader(this.publication.getBaseURI());
    loader.setReadiumCssBasePath('/assets/readium-css');

    const cvf = new ContentViewFactory(loader);
    // const cvf = new ContentViewFactory(this.publication);
    this.rendition = new Rendition(this.publication, this.root, cvf);
    this.rendition.setViewAsVertical(this.props.viewAsVertical);

    const viewportSize = this.props.viewAsVertical ? this.viewportHeight :
                                                      this.viewportWidth;
    const viewportSize2nd = this.props.viewAsVertical ? this.viewportWidth :
                                                        this.viewportHeight;

    this.rendition.viewport.setViewportSize(viewportSize, viewportSize2nd);
    this.rendition.viewport.setPrefetchSize(Math.ceil(viewportSize * 0.1));
    this.rendition.setPageLayout({
      spreadMode: SpreadMode.FitViewportDoubleSpread,
      pageWidth: 0,
      pageHeight: this.viewportHeight,
    });

    this.rendition.render();
    this.rendition.viewport.enableScroll(this.props.enableScroll);

    this.props.onRenditionCreated(this.rendition);
  }

  private updateRoot(root: HTMLElement | null): void {
    this.root = root;
  }
}
