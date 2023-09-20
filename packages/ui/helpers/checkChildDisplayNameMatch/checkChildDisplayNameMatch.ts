import type {
  ComponentClass,
  ElementType,
  FunctionComponent,
  NamedExoticComponent,
  ReactChild,
  ReactElement,
  ReactFragment,
  ReactNode,
  ReactPortal,
} from "react";

/**
 * Verifies if React child's `displayName` property matches with selected other component.
 * Particularly useful with in compound components pattern with React.Children.toArray
 */
export function checkChildDisplayNameMatch(
  child: ReactNode | ReactChild | ReactFragment | ReactPortal,
  ComponentType: ElementType
) {
  const currentDisplayName = (
    child as ReactElement<
      unknown,
      FunctionComponent | ComponentClass | NamedExoticComponent
    >
  )?.type?.displayName;

  const desiredDisplayName = (ComponentType as unknown as NamedExoticComponent)
    ?.displayName;

  if (!desiredDisplayName) {
    return true;
  }

  return currentDisplayName === desiredDisplayName;
}
