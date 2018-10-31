import {
  RenditionContext,
  Location,
} from '@evidentpoint/r2-navigator-web';

export class ViewportResizer {
  private viewRoot: HTMLElement;
  private rendCtx: RenditionContext;

  private resizeListener: EventCallback;

  private location: Location | null | undefined;

  public constructor(viewRoot: HTMLElement, rendCtx: RenditionContext) {
    this.viewRoot = viewRoot;
    this.rendCtx = rendCtx;

    this.registerResizeHandler();
  }

  public stopListenResize(): void {
    window.removeEventListener('resize', this.resizeListener);
  }

  private registerResizeHandler(): void {
    this.resizeListener = extendedThrottle(
      this.handleViewportResizeStart.bind(this),
      this.handleViewportResizeTick.bind(this),
      this.handleViewportResizeEnd.bind(this),
      250, 1000, this);

    window.addEventListener('resize', this.resizeListener);
  }

  private handleViewportResizeStart(): void {
    this.location = this.rendCtx.navigator.getCurrentLocation();
  }

  private handleViewportResizeTick(): void {
    // this.resize();
  }

  private async handleViewportResizeEnd(): Promise<void> {
    this.resize();

    if (this.location) {
      await this.rendCtx.rendition.viewport.renderAtLocation(this.location);
    }
  }

  private resize(): void {
    const newWidth = this.viewRoot.clientWidth;
    const newHeight = this.viewRoot.clientHeight;

    this.rendCtx.rendition.viewport.setViewportSize(newWidth, newHeight);
    this.rendCtx.rendition.refreshPageLayout();
  }
}

type EventCallback = (evt: UIEvent) => void;

function extendedThrottle(startCb: EventCallback, tickCb: EventCallback, endCb: EventCallback,
                          delay?: number, waitThreshold?: number,
                          context?: any): EventCallback {
  const aDelay = delay === undefined ? 250 : delay;
  const aWaitThreshold = waitThreshold === undefined ? aDelay : waitThreshold;

  let first = true;
  let last: number | undefined;
  let deferTimer: number | undefined;

  return function (event: UIEvent): void {
      const ctx = context;
      const now = (Date.now && Date.now()) || new Date().getTime();

      if (!(last && now < last + aDelay)) {
          last = now;
          if (first) {
              startCb.apply(ctx, event);
              first = false;
          } else {
              tickCb.apply(ctx, event);
          }
      }

      clearTimeout(deferTimer);
      deferTimer = window.setTimeout(
        () => {
          last = now;
          first = true;
          endCb.apply(ctx, event);
        },
        aWaitThreshold);
  };
}
