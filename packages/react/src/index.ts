"use client";

// Component re-exports (HeroUI v3 modular architecture)
export * from "./components/button";
export * from "./components/select";
export * from "./components/combobox";
export * from "./components/color";
export * from "./components/command-palette";
export * from "./components/token-field";
export * from "./components/sheet";
export * from "./components/preview-trigger";
export * from "./components/tree";
export * from "./components/grid-list";
export * from "./components/list-box";
export * from "./components/autocomplete";
export * from "./components/modal";
export * from "./components/dialog";
export * from "./components/popover";
export * from "./components/drawer";
export * from "./components/checkbox";
export * from "./components/radio";
export * from "./components/switch";
export * from "./components/tabs";
export * from "./components/accordion";
export * from "./components/disclosure";
export * from "./components/toolbar";
export * from "./components/meter";
export * from "./components/dropzone";
export * from "./components/tag";
export * from "./components/badge";
export * from "./components/card";
export * from "./components/text-field";
export * from "./components/number-field";
export * from "./components/search-field";
export * from "./components/time-field";
export * from "./components/date-picker";
export * from "./components/pagination";
export * from "./components/progress";
export * from "./components/tooltip";
export * from "./components/toast";
export * from "./components/kbd";
export * from "./components/empty-state";
export * from "./components/avatar";
export * from "./components/table";
export * from "./components/theme";



export { Theme, Layer, useTheme, useOverlayTheme } from "./theme";
export type { ThemeProps, LayerProps } from "./theme";
export { Icon } from "./icons";
export type { IconName, IconProps } from "./icons";
export { Button, Link, ToggleButton, ContentSwitcher } from "./buttons";
export type {
  ButtonProps,
  ButtonVariant,
  LinkProps,
  ToggleButtonProps,
  ContentSwitcherProps,
} from "./buttons";
export { TextField, TextArea, NumberField, SearchField } from "./fields";
export type {
  TextFieldProps,
  TextAreaProps,
  NumberFieldProps,
  SearchFieldProps,
  FieldContentProps,
  TextFieldRootProps,
  TextAreaRootProps,
  NumberFieldRootProps,
  SearchFieldRootProps,
} from "./fields";
export type {
  FieldLabelProps,
  FieldDescriptionProps,
  FieldErrorMessageProps,
  FieldHelpProps,
  FieldInputProps,
  FieldTextAreaProps,
  FieldControlProps,
  FieldDateInputProps,
  FieldStatus,
  FieldStatusProps,
  FieldStatusIconProps,
  FieldPresentationProps,
  FieldLabelOptions,
} from "./field-parts";
export {
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Switch,
  Select,
  ComboBox,
  ComboBoxCreateItem,
  Slider,
} from "./selection";
export type {
  CheckboxProps,
  CheckboxGroupProps,
  RadioProps,
  RadioGroupProps,
  SwitchProps,
  SelectProps,
  ComboBoxProps,
  ComboBoxCreateItemProps,
  SliderProps,
  SelectionColor,
  CheckboxGroupRootProps,
  RadioGroupRootProps,
  SelectRootProps,
  ComboBoxRootProps,
} from "./selection";
export {
  TokenField,
  TokenFieldContext,
  useTokenFieldContext,
  TokenFieldValue,
} from "./token-field";
export type {
  TokenFieldProps,
  TokenFieldRootProps,
  TokenInputProps,
  TokenProps,
  TokenSegment,
  TokenFieldContextValue,
} from "./token-field";
export { Popover, Modal, Dialog, Tooltip, OverflowMenu } from "./overlays";
export type {
  PopoverProps,
  ModalProps,
  DialogProps,
  TooltipProps,
  OverflowMenuProps,
} from "./overlays";
export {
  CommandPalette,
  CommandPaletteContext,
  useCommandPaletteContext,
} from "./command-palette";
export type {
  CommandPaletteProps,
  CommandPaletteRootProps,
  CommandPaletteDialogProps,
  CommandPaletteInputProps,
  CommandPaletteListProps,
  CommandPaletteGroupProps,
  CommandPaletteItemProps,
  CommandPaletteEmptyProps,
  CommandPaletteFooterProps,
  CommandPaletteContextValue,
} from "./command-palette";
export { Drawer } from "./drawer";
export type {
  DrawerProps,
  DrawerPlacement,
  DrawerSize,
} from "./drawer";
export {
  Calendar,
  RangeCalendar,
  DatePicker,
  DateRangePicker,
  DateField,
  TimeField,
} from "./dates";
export type {
  CalendarProps,
  RangeCalendarProps,
  DatePickerProps,
  DateRangePickerProps,
  DateFieldProps,
  TimeFieldProps,
  DatePickerRootProps,
  DateRangePickerRootProps,
  DateFieldRootProps,
  TimeFieldRootProps,
} from "./dates";
export {
  Table,
  TableLoadMore,
  Column,
  Tabs,
  Accordion,
  AccordionItem,
  Breadcrumbs,
  BreadcrumbItem,
  Breadcrumb,
  TagGroup,
  FilterTag,
} from "./collections";
export type {
  TableProps,
  TableLoadMoreProps,
  ColumnProps,
  TabsProps,
  AccordionProps,
  AccordionItemProps,
  BreadcrumbsProps,
  BreadcrumbItemProps,
  TagGroupProps,
  FilterTagProps,
} from "./collections";
export { NativeSelect, Pagination, paginationRange } from "./pagination";
export type { NativeSelectProps, PaginationProps } from "./pagination";
export {
  InlineNotification,
  Alert,
  ProgressBar,
  Loading,
  InlineLoading,
  Skeleton,
  ToastProvider,
  useToast,
} from "./feedback";
export type {
  InlineNotificationProps,
  AlertProps,
  NotificationKind,
  NotificationVariant,
  ProgressBarProps,
  LoadingProps,
  InlineLoadingProps,
  SkeletonProps,
  ToastMessage,
} from "./feedback";
export { Meter, deriveMeterTone, MeterContext } from "./meter";
export type {
  MeterProps,
  MeterRootProps,
  MeterLabelProps,
  MeterValueProps,
  MeterTrackProps,
  MeterFillProps,
  MeterHelperTextProps,
  MeterCircleProps,
  MeterSegment,
  MeterTone,
  MeterContextValue,
} from "./meter";
export {
  Tag,
  CodeSnippet,
  Tile,
  ClickableTile,
  SelectableTile,
  ExpandableTile,
  List,
  StructuredList,
  StructuredListRow,
  ProgressIndicator,
} from "./content";
export type {
  TagProps,
  TagColor,
  CodeSnippetProps,
  TileProps,
  ClickableTileProps,
  SelectableTileProps,
  ExpandableTileProps,
  ListProps,
  StructuredListProps,
  StructuredListRowProps,
  ProgressStep,
  ProgressIndicatorProps,
} from "./content";
export { FileUploader, acceptsFile } from "./files";
export type { FileUploaderProps } from "./files";
export { DropZone, FileTrigger, DropZoneContext } from "./dropzone";
export type {
  DropZoneProps,
  DropZoneRootProps,
  DropZoneFeedbackProps,
  FileTriggerProps,
  DropZoneContextValue,
} from "./dropzone";
export { Stack, Grid, GridColumn, Header, HeaderName, HeaderNav, SideNav } from "./layout";
export type { StackProps, ColumnLayoutProps, HeaderProps } from "./layout";
export { Avatar, AvatarGroup, getInitials } from "./avatar";
export type { AvatarProps, AvatarGroupProps, AvatarSize, AvatarPresence } from "./avatar";
export { Badge } from "./badge";
export type { BadgeProps, BadgeKind, BadgePlacement } from "./badge";
export { Kbd } from "./kbd";
export type { KbdProps } from "./kbd";
export { Divider } from "./divider";
export type { DividerProps } from "./divider";
export { Card, CardHeader, CardBody, CardFooter } from "./card";
export type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
  CardElevation,
} from "./card";
export { EmptyState } from "./empty-state";
export type { EmptyStateProps } from "./empty-state";
export { AlertDialog } from "./alert-dialog";
export type { AlertDialogProps, AlertDialogKind } from "./alert-dialog";
export { TableBatchActions } from "./table-batch-actions";
export type { TableBatchActionsProps } from "./table-batch-actions";
export { ActionableNotification } from "./actionable-notification";
export type { ActionableNotificationProps } from "./actionable-notification";
export { InputOTP } from "./input-otp";
export type { InputOTPProps } from "./input-otp";
export { ProgressCircle } from "./progress-circle";
export type { ProgressCircleProps } from "./progress-circle";
export { AILabel } from "./ai-label";
export type { AILabelProps } from "./ai-label";
export { Toolbar, ToolbarGroup, ToolbarItem, ToolbarSeparator } from "./toolbar";
export type {
  ToolbarProps,
  ToolbarGroupProps,
  ToolbarItemProps,
  ToolbarSeparatorProps,
  ToolbarContextValue,
} from "./toolbar";
export {
  Disclosure,
  DisclosureRoot,
  DisclosureTrigger,
  DisclosureIndicator,
  DisclosurePanel,
  DisclosureGroup,
} from "./disclosure";
export type {
  DisclosureProps,
  DisclosureTriggerProps,
  DisclosureIndicatorProps,
  DisclosurePanelProps,
  DisclosureGroupProps,
  DisclosureContextValue,
} from "./disclosure";
export {
  GridList,
  GridListRoot,
  GridListItem,
  GridListDragHandle,
  GridListCheckbox,
  GridListEmptyState,
  GridListLoadMore,
  GridListContext,
} from "./grid-list";
export type {
  GridListProps,
  GridListRootProps,
  GridListItemProps,
  GridListDragHandleProps,
  GridListCheckboxProps,
  GridListEmptyStateProps,
  GridListLoadMoreProps,
  GridListContextValue,
} from "./grid-list";
export {
  ListBox,
  ListBoxRoot,
  ListBoxItem,
  ListBoxSection,
  ListBoxHeader,
  ListBoxDragHandle,
  ListBoxCheckbox,
  ListBoxEmptyState,
  ListBoxLoadMore,
  ListBoxContext,
} from "./list-box";
export type {
  ListBoxProps,
  ListBoxRootProps,
  ListBoxItemProps,
  ListBoxSectionProps,
  ListBoxHeaderProps,
  ListBoxDragHandleProps,
  ListBoxCheckboxProps,
  ListBoxEmptyStateProps,
  ListBoxLoadMoreProps,
  ListBoxContextValue,
} from "./list-box";
export { Autocomplete } from "./autocomplete";
export type { AutocompleteProps } from "./autocomplete";
export {
  Tree,
  TreeRoot,
  TreeItem,
  TreeIndicator,
  TreeContent,
  TreeItemContent,
  TreeCheckbox,
  TreeContext,
} from "./tree";
export type {
  TreeProps,
  TreeRootProps,
  TreeItemProps,
  TreeIndicatorProps,
  TreeContentProps,
  TreeCheckboxProps,
  TreeContextValue,
} from "./tree";
export {
  NavigationTree,
  NavigationTreeRoot,
  NavigationTreeItem,
  NavigationTreeIndicator,
  NavigationTreeItemContent,
  NavigationTreeSection,
  NavigationTreeHeader,
  NavigationTreeContext,
} from "./navigation-tree";
export type {
  NavigationTreeProps,
  NavigationTreeRootProps,
  NavigationTreeItemProps,
  NavigationTreeIndicatorProps,
  NavigationTreeItemContentProps,
  NavigationTreeSectionProps,
  NavigationTreeHeaderProps,
  NavigationTreeContextValue,
} from "./navigation-tree";
export {
  Sheet,
  SheetRoot,
  SheetTrigger,
  SheetOverlay,
  SheetBackdrop,
  SheetContent,
  SheetHandle,
  SheetContext,
  SheetConvenience,
} from "./sheet";
export type {
  SheetProps,
  SheetRootProps,
  SheetTriggerProps,
  SheetOverlayProps,
  SheetBackdropProps,
  SheetContentProps,
  SheetHandleProps,
  SheetConvenienceProps,
  SheetContextValue,
  SheetRenderProps,
} from "./sheet";
export { PreviewTrigger, PreviewTriggerRoot } from "./preview-trigger";
export type { PreviewTriggerProps } from "./preview-trigger";
export {
  ColorPicker,
  ColorPickerRoot,
  ColorPickerConvenience,
  ColorArea,
  ColorSlider,
  ColorWheel,
  ColorWheelTrack,
  ColorField,
  ColorSwatch,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorThumb,
  parseColor,
} from "./color";
export type {
  Color,
  ColorPickerProps,
  ColorPickerRootProps,
  ColorPickerConvenienceProps,
  ColorPickerRenderProps,
  ColorAreaProps,
  ColorAreaRenderProps,
  ColorSliderProps,
  ColorSliderRenderProps,
  ColorWheelProps,
  ColorWheelRenderProps,
  ColorWheelTrackProps,
  ColorWheelTrackRenderProps,
  ColorFieldProps,
  ColorFieldRenderProps,
  ColorSwatchProps,
  ColorSwatchRenderProps,
  ColorSwatchPickerProps,
  ColorSwatchPickerRenderProps,
  ColorSwatchPickerItemProps,
  ColorSwatchPickerItemRenderProps,
  ColorThumbProps,
  ColorThumbRenderProps,
} from "./color";
export { cx } from "./utils";
export type { ControlSize } from "./utils";
export type { ThemeName, LayerLevel } from "@hashti/tokens";

// Compositional RAC parts: their types, slots, refs and collection behavior are
// preserved verbatim. The accompanying stylesheet supplies Carbon geometry/states.
export {
  Form,
  Label,
  Input,
  Text,
  FieldError,
  Group,
  Heading,
  Keyboard,
  DialogTrigger,
  TooltipTrigger,
  MenuTrigger,
  SubmenuTrigger,
  Menu,
  MenuItem,
  MenuSection,
  Header as SectionHeader,
  Separator,
  SelectValue,
  ComboBoxValue,
  TableHeader,
  TableBody,
  TableFooter,
  Row,
  Cell,
  ColumnResizer,
  ResizableTableContainer,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  TreeSection,
  DateInput,
  DateSegment,
  CalendarGrid,
  CalendarCell,
  SliderTrack,
  SliderThumb,
  SliderFill,
  SliderOutput,
  Collection,
  VisuallyHidden,
  useFilter,
  useListData,
  useAsyncList,
  useDragAndDrop,
  I18nProvider,
  RouterProvider,
} from "react-aria-components";
export type {
  Key,
  Selection,
  SortDescriptor,
  SortDirection,
  DateValue,
  TimeValue,
  DateRange,
  FormProps,
  MenuProps,
  MenuItemProps,
  TableHeaderProps,
  TableBodyProps,
  RowProps,
  CellProps,
  TabProps,
  ValidationResult,
} from "react-aria-components";
