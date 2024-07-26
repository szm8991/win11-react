declare class Highlight {
  constructor(...range: Range[]);
}

declare namespace CSS {
  var highlights: Map<string, Highlight>;
}
