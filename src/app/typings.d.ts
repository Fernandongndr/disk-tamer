import * as React from "react";

export type MeasurementType = "client" | "offset" | "scroll" | "bounds" | "margin";

interface TopLeft {
  readonly top: number;
  readonly left: number;
}

interface BottomRight {
  readonly bottom: number;
  readonly right: number;
}

interface Dimensions {
  readonly width: number;
  readonly height: number;
}

export type Margin = TopLeft & BottomRight;

export type Rect = TopLeft & Dimensions;

export type BoundingRect = Dimensions & Margin;

export interface ContentRect {
  client?: Rect | undefined;
  offset?: Rect | undefined;
  scroll?: Rect | undefined;
  bounds?: BoundingRect | undefined;
  margin?: Margin | undefined;
  //eslint-disable-next-line
  entry?: any;
}

export interface MeasuredComponentProps {
  measureRef(ref: Element | null): void;
  measure(): void;
  contentRect: ContentRect;
}

type MeasuredComponent<T> = React.ComponentType<T & MeasuredComponentProps>;

export interface MeasureProps {
  client?: boolean | undefined;
  offset?: boolean | undefined;
  scroll?: boolean | undefined;
  bounds?: boolean | undefined;
  margin?: boolean | undefined;
  innerRef?: React.Ref<Element> | undefined;
  onResize?(contentRect: ContentRect): void;
  children?: React.FC<MeasuredComponentProps> | undefined;
}

export function withContentRect(
  types: readonly MeasurementType[] | MeasurementType
  //eslint-disable-next-line
): <T extends {}>(fn: MeasuredComponent<T>) => React.ComponentType<T>;

declare class Measure extends React.Component<MeasureProps> {}
export default Measure;
