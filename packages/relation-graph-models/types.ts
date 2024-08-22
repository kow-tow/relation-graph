/**
 * relation-graph
 * Website: https://ssl.relation-graph.com/
 *          http://www.relation-graph.com/
 * Github: https://github.com/seeksdream/relation-graph
 * QQ: 3235808353
 *
 */

import { RelationGraphFinal } from "./models/RelationGraphFinal";

export type RGJunctionPoint = 'border' | 'lr' | 'tb' | 'ltrb' | 'left' | 'top' | 'right' | 'bottom';
export type RGPositionPoint = 'left' | 'top' | 'right' | 'bottom';
export type RGNodeShape = 0 | 1 | undefined;
export type RGLineShape = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 41 | undefined;
export type RGUserEvent = MouseEvent | TouchEvent;
export interface JsonNode {
  id: string
  text?: string
  type?: string
  isHide?: boolean
  expanded?: boolean
  junctionPoint?: RGJunctionPoint
  alignItems?: RGPositionPoint
  selected?: boolean
  disableDefaultClickEffect?: boolean
  disableDrag?: boolean
  singleNode?: boolean
  styleClass?: string
  className?: string
  nodeShape?: RGNodeShape
  borderWidth?: number
  borderColor?: string
  fontColor?: string
  color?: string
  opacity?: number
  fixed?: boolean
  width?: number
  height?: number
  x?: number
  y?: number
  offset_x?: number
  offset_y?: number
  expandHolderPosition?: string
  innerHTML?: string
  html?: string
  data?: { [key: string]: any }
  children?: JsonNode[]
  childs?: JsonNode[]
  force_weight?: number
  alwaysRender?: boolean
};
export interface JsonLine {
  id?: string
  from: string
  to: string
  text?: string
  color?: string
  fontColor?: string
  lineWidth?: number
  opacity?: number
  lineShape?: RGLineShape
  styleClass?: string
  className?: string
  isHide?: boolean
  arrow?: string
  showStartArrow?: boolean
  showEndArrow?: boolean
  useTextPath?: boolean
  isHideArrow?: boolean
  reverseText?: boolean
  lineDirection?: string
  disableDefaultClickEffect?: boolean
  data?: { [key: string]: any }
  force_elastic?: number
  textOffset_x?: number
  textOffset_y?: number
  animation?: number
  dashType?: number
  forDisplayOnly?: boolean
  fromJunctionPoint?: RGJunctionPoint
  toJunctionPoint?: RGJunctionPoint
};
export interface RGNode extends JsonNode {
  seeks_id: number
  x: number
  y: number
  Fx: number
  Fy: number
  isShow: boolean
  invisiable?: boolean
  flashing?: boolean
  dragging?: boolean
  targetNodes: RGNode[]
  targetFrom: RGNode[]
  targetTo: RGNode[]
  lot: {
    childs: RGNode[]
    parent?: RGNode | undefined
    eached?: boolean
    strength?: number
    subling?: {
      level: number
      all_size: number
      all_strength: number
    }
    level?: number
    index_of_parent?: number
    strength_plus?: number
    index_of_level?: number
    childs_size?: number
    index_of_p_childs?: number
    level_index?: number
    strengthWithChilds?: number
    strengthWithChilds_from?: number
    placed?: boolean
    notLeafNode?: boolean
    x?: number
    y?: number
    to_x?: number
    to_y?: number
    from_x?: number
    from_y?: number
  }
  origin_x?: number
  origin_y?: number
  el: { offsetWidth: number; offsetHeight: number }
};
export interface RGLine extends JsonLine {
  seeks_id: string
  reverseText?: boolean
  isReverse?: boolean // 自动计算，无需设置
  hidden?: boolean
  polyLineStartDistance?: number
  disableDefaultClickEffect?: boolean
};
export type RGLineTarget = {
  x: number,
  y: number,
  el: {
    offsetWidth: number,
    offsetHeight: number
  }
};
export type RGLink = {
  seeks_id: string
  fromNode: RGNode
  toNode: RGNode
  appended: boolean
  forDisplayOnly: boolean
  invisiable?: boolean
  relations: RGLine[]
};
export type RGElementLine = RGLink;
export type RGJsonData = {
  rootId?: string
  nodes: JsonNode[]
  lines: JsonLine[]
  [key:string]: any
  // elementLines?: JsonLine[]
};
export type RGGraphData = {
  rootNode?: RGNode,
  nodes: RGNode[],
  links: RGLink[],
  elementLines: RGElementLine[]
};
export type RGPosition = {
  x: number
  y: number
};
export type RGDraggingCallback = (
  offsetX: number,
  offsetY: number,
  startElPosition: { x: number; y: number },
  startEventPosition: { x: number; y: number },
  event: MouseEvent | TouchEvent
) => void;
export type RGDragedCallback = (
  buffX: number,
  buffY: number,
  event: MouseEvent | TouchEvent
) => void;

export type RGLayoutOptionsCore = {
  layoutName: string;
  label?: string
  layoutClassName?: string
  layoutLabel?: string
  layoutDirection?: string
  centerOffset_x?: number
  centerOffset_y?: number
  allowAutoLayoutIfSupport?: boolean
  useLayoutStyleOptions?: boolean
  fixedRootNode?: boolean
};
export type RGForceLayoutOptions = RGLayoutOptionsCore & {
  fastStart?: boolean;
  maxLayoutTimes?: number;
  byNode?: boolean;
  byLine?: boolean;
  force_node_repulsion?: number;
  force_line_elastic?: number;
  startAngle?: number;
};
export type RGCenterLayoutOptions = RGForceLayoutOptions & {
  distance_coefficient?: number
  levelDistance?: string
};
export type RGTreeLayoutOptions = RGLayoutOptionsCore & {
  from?: string
  levelDistance?: string
  min_per_width?: number
  max_per_width?: number
  min_per_height?: number
  max_per_height?: number
};
export type RGLayoutOptions =
  | RGLayoutOptionsCore
  | RGForceLayoutOptions
  | RGCenterLayoutOptions
  | RGTreeLayoutOptions;

export interface RGLayouter {
  isMainLayouer: boolean
  requireLinks: boolean
  allNodes: RGNode[]
  rootNode?: RGNode
  layoutOptions: RGLayoutOptions
  refresh: () => void
  setLinks: (links:RGLink[]) => void
  placeNodes: (allNodes: RGNode[], rootNode: RGNode) => void
  snapshotBeforeAnimation: () => void
  animationLayout: (resetNodeFromPosition?:boolean) => void
  autoLayout?: (forceLayout?: boolean, viewUpdate?: (() => void)|false) => void
  stop?: () => void
}
export interface RGOptions {
  debug?: boolean // UI
  showDebugPanel?: boolean // UI
  backgroundImageNoRepeat?: boolean // UI
  backgroundColor?: string // UI
  backgroundImage?: string // UI
  downloadImageFileName?: string // UI
  disableZoom?: boolean // UI
  disableDragNode?: boolean // UI
  disableDragLine?: boolean // UI
  selectionMode?: boolean // UI
  moveToCenterWhenRefresh?: boolean // UI
  zoomToFitWhenRefresh?: boolean // UI
  useAnimationWhenRefresh?: boolean // UI
  useAnimationWhenExpanded?: boolean // UI
  defaultFocusRootNode?: boolean // UI
  disableNodeClickEffect?: boolean // UI
  disableLineClickEffect?: boolean // UI
  allowShowZoomMenu?: boolean // UI
  allowAutoLayoutIfSupport?: boolean // UI
  allowShowRefreshButton?: boolean // UI
  allowShowDownloadButton?: boolean // UI
  allowShowFullscreenMenu?: boolean // UI
  backgrounImageNoRepeat?: boolean // UI
  allowShowMiniToolBar?: boolean // UI
  toolBarVersion?: string // UI
  toolBarDirection?: string // UI
  toolBarPositionH?: string // UI
  toolBarPositionV?: string // UI
  allowSwitchLineShape?: boolean // UI
  allowSwitchJunctionPoint?: boolean // UI
  isMoveByParentNode?: boolean // UI
  defaultExpandHolderPosition?: 'hide' | 'left' | 'top' | 'right' | 'bottom' // UI
  defaultExpandHolderColor?: string // UI
  defaultNodeColor?: string // UI
  checkedLineColor?: string //  // UI
  defaultLineFontColor?: string //  // UI
  defaultLineTextOffset_x?: number, // UI
  defaultLineTextOffset_y?: number, // UI
  defaultNodeFontColor?: string // UI
  defaultNodeBorderColor?: string // UI
  defaultNodeBorderWidth?: number // UI
  defaultLineColor?: string // UI
  defaultLineWidth?: number // UI
  defaultLineShape?: RGLineShape // UI
  defaultNodeShape?: RGNodeShape // UI
  defaultNodeWidth?: number // UI
  defaultNodeHeight?: number // UI
  defaultShowLineLabel?: boolean // UI
  hideNodeContentByZoom?: boolean // UI
  defaultJunctionPoint?: RGJunctionPoint // UI
  defaultBottomJuctionPoint_X?: number // UI
  disableDragCanvas?: boolean // UI
  placeSingleNode?: boolean
  placeOtherNodes?: boolean
  lineUseTextPath?: boolean // UI
  lineTextMaxLength?: number
  multiLineDistance?: number
  checkedNodeId?: string // private
  checkedLineId?: string // private
  checkedLinkId?: string // private
  performanceMode?: boolean,
  data?: any // UI
  defaultLineMarker?: {
    markerWidth: number
    markerHeight: number
    refX: number
    refY: number
    color?: string
    data: string
  }
  layouts?: RGLayoutOptions[]
  layout?: RGLayoutOptions
  graphOffset_x?:number
  graphOffset_y?:number
  canvasZoom?: number // private
  showSingleNode?: boolean // private
  showNodeLabel?: boolean // private
  placeOtherGroup?: boolean
  defaultPolyLineRadius?: number, // UI
  reLayoutWhenExpandedOrCollapsed?: boolean // UI
}
export type RGLineColorItem = {
  id: string, color: string
};
export type RGGraphReactiveData = {
  instance: RelationGraphFinal|undefined,
  options: RGOptions|undefined,
  allLineColors:RGLineColorItem[]
};
export type RGSelectionView = {
  x: number
  y: number
  width: number
  height: number
};
export type RGEventTargetType = 'canvas'|'node'|'link';
export interface RGListeners {
  onNodeClick?: (node: RGNode, e: RGUserEvent) => boolean | void | Promise<boolean | void>
  onNodeExpand?: (node: RGNode, e: RGUserEvent) => boolean | void | Promise<boolean | void>
  onNodeCollapse?: (node: RGNode, e: RGUserEvent) => boolean | void | Promise<boolean | void>
  onLineClick?: (line: RGLine, link: RGLink, e: RGUserEvent) => boolean | void | Promise<boolean | void>
  onImageDownload?: (dom: HTMLElement, format: string) => boolean | void
  onImageSaveAsFile?: (canvas: HTMLCanvasElement, format: string, fileName: string) => boolean | void
  beforeChangeLayout?: (newLayoutOptions:RGLayoutOptions) => boolean | void
  onNodeDragStart?: (node:RGNode, e:RGUserEvent) => void
  onNodeDragEnd?: (node:RGNode, e:RGUserEvent) => void
  onNodeDragging?: (node:RGNode, newX:number, newY:number, e:RGUserEvent) => RGPosition | undefined
  onCanvasDragEnd?: (e:RGUserEvent) => void
  onContextmenu?: (e:RGUserEvent, objectType:RGEventTargetType, object:RGNode|RGLink|undefined) => void
  onFullscreen?: (newValue:boolean, defaultFullscreen: () => Promise<void>) => void
  onCanvasClick?: (e:RGUserEvent) => void
  onCanvasSelectionEnd?: (selectionView:RGSelectionView, e:RGUserEvent) => void
  // 不要在这个时间中调用任何触发setZoom的动作
  onZoomEnd?: () => void
}
export type RGEventHandler = (eventName:string, object: {[option: string]:any}) => void;
export interface RGV2Options extends RGOptions {
  useHorizontalView?: boolean // UI
  ovUseNodeSlot?: boolean // UI
  ovUseLineSlot?: boolean // UI
  ovUseToolbarSlot?: boolean // UI
  ovUseNodeExpandHolderSlot?: boolean // UI
  creatingSelection?: boolean // UI
  selectionView?: any // UI
  creatingNodePlot?: boolean // UI
  showTemplateNode?: boolean // UI
  newNodeTemplate?: any // UI
  creatingLinePlot?: boolean // UI
  newLineTemplate?: any // UI
  newLinkTemplate?: any // UI
}
export interface RGOptionsFull extends RGV2Options {
  debug?: boolean // UI
  graphLoading?: boolean // UI
  graphLoadingText?: string // UI
  showMaskWhenLayouting: boolean // UI
  instanceDestroyed: boolean // UI
  oldVueVersion: boolean // UI
  instanceId: string
  viewSize: { width: number; height: number }
  viewELSize: { width: number; height: number; left: number; top: number }
  viewNVInfo: { width: number; height: number; x: number; y: number }
  canvasNVInfo: { width: number; height: number; x: number; y: number }
  // NMViewCenter: { x: 0, y: 0 },
  // NMCanvasCenter: { x: 0, y: 0 },
  allowShowMiniView: boolean // private
  allowShowSettingPanel: boolean // private
  allowShowMiniNameFilter: boolean // private
  fullscreen: boolean // private
  layoutLabel?: string // private
  layoutName?: string // private
  label?: string // private
  layoutClassName?: string // private
  layoutDirection?: string // private
  autoLayouting: boolean // private
  layouter: RGLayouter | undefined // private
  isNeedShowAutoLayoutButton: boolean // private
  showNodeShortLabel: boolean // private
  canvasSize: {
    width: number
    height: number
  }
  canvasOffset: {
    x: number
    y: number
    zoom_buff_x: number
    zoom_buff_y: number
  }
  showEasyView?: boolean // private
  canvasOpacity?: number // private
}

export type RGRefreshCallback = (graphInstance: any) => void;
export type RelationGraphInstance = RelationGraphFinal;
export interface RelationGraphInstance2 {
  // (options: RGOptions, listeners: RGListeners)
  options: RGOptions
  enableDebugLog(enable: boolean):void
  ready():void
  setDom(relationGraphDom: HTMLElement):void
  setCanvasDom(canvasDom: HTMLElement):void
  fullscreen(newValue?: boolean):void
  setOptions(
    options: RGOptions,
    callback?: (graphInstance: this) => void
  ):void
  setLayouter(userLayouerInstance: RGLayouter):void
  initLayouter():void
  setJsonData(
    jsonData: RGJsonData,
    reLayout?: boolean | RGRefreshCallback,
    callback?: (graphInstance: this) => void
  ):void
  appendJsonData(
    jsonData: RGJsonData,
    reLayout?: boolean | RGRefreshCallback,
    callback?: (graphInstance: this) => void
  ):void
  getNodes():RGNode[]
  getLinks():RGLink[];
  getGraphJsonData():RGJsonData
  getGraphJsonOptions():RGOptions
  getNodeById(nodeId: string):RGNode
  addNodes(nodes: JsonNode[]):void
  addLines(lines: JsonLine[]):void
  removeNodeById(nodeId: string):void
  removeLinkById(node1Id: string, node2Id: string):void
  focusRootNode():void
  focusNodeById(nodeId: string):void
  setNodePosition(node: RGNode, x: number, y: number):void
  doLayout():void
  refresh(callback?: RGRefreshCallback):void
  dataUpdated():void
  getNodesCenter():void
  setCanvasCenter(x: number, y: number):void
  setCanvasOffset(x: number, y: number):void
  placeSingleNode():void
  zoomToFit():Promise<void>
  animateGoto(x: number, y: number, time: number, callback?: RGRefreshCallback):Promise<void>
  animateToZoom(finalZoom: number, time: number, callback?: RGRefreshCallback):Promise<void>
  startAutoLayout():void
  stopAutoLayout():void
  setCheckedNode(nodeId: string):void
  setCheckedLine(lineId: string):void
  selectNode(node: RGNode, selected: boolean):void
  expandOrCollapseNode(node: RGNode, e?: MouseEvent):Promise<void>
  expandNode(node: RGNode, e?: MouseEvent):Promise<void>
  collapseNode(node: RGNode, e?: MouseEvent):Promise<void>
  downloadAsImage(fileName: string, format?: string):Promise<void>
  zoom(buff: number, userZoomCenter?: RGPosition):Promise<void>
  setZoom(finalZoom: number):Promise<void>
  playShowEffect(callback: RGRefreshCallback):Promise<void>
  updateNodeOffsetSize(
    node: RGNode,
    nodeOffsetWidth: number,
    nodeOffsetHeight: number
  ):void
  onNodeClick(node: RGNode, e: MouseEvent | TouchEvent):Promise<void>
  onLineClick(line: RGLine, link: RGLink, e: MouseEvent | TouchEvent):Promise<void>
  printGraphJsonData():void
}
export interface RelationGraphExpose{
  getInstance(): RelationGraphInstance
  setOptions(
    options: RGOptions,
    callback?: (graphInstance: RelationGraphInstance) => void
  ):void;
  setJsonData(
    jsonData: RGJsonData,
    reLayoutOrCallback?: boolean | RGRefreshCallback,
    callback?: (graphInstance: RelationGraphInstance) => void
  ):void;
  appendJsonData(
    jsonData: RGJsonData,
    reLayout?: boolean | RGRefreshCallback,
    callback?: (graphInstance: RelationGraphInstance) => void
  ):void;
  setLayouter(layouterInstance: RGLayouter):void;
  onGraphResize():void;
  refresh(callback?: RGRefreshCallback):void;
  focusRootNode():void;
  focusNodeById(nodeId: string):void;
  getNodeById(nodeId: string):RGNode|undefined;
  removeNodeById(nodeId: string):void;
  getNodes():RGNode[];
  getLinks():RGLink[];
  getGraphJsonData():RGJsonData;
  getGraphJsonOptions():RGOptions;
  updateView():void;
}
export interface RelationGraphComponent extends RelationGraphExpose {

}
export interface RGNodeSlotProps {
  node: RGNode
  relationGraph: RelationGraphInstance
}
export interface RGLineSlotProps {
  link: RGLink
  line: RGLine
  lineIndex: number
  relationGraph: RelationGraphInstance
}
export type RelationGraphProps  = RGListeners & {
  options: RGOptions;
  relationGraphCore?: any;
};
// export interface RelationGraphProps extends RGListeners{
//   options: RGOptions
//   relationGraphCore?: any
// }
