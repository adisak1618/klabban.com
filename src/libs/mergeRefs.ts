export function mergeRefs<T>(...refs: Array<React.Ref<T>>): React.RefCallback<T> {
  return (node: T | null) => {
      refs.forEach(ref => {
          if (ref) {
              if (typeof ref === 'function') {
                  ref(node);
              } else {
                  (ref as React.MutableRefObject<T | null>).current = node;
              }
          }
      });
  };
}
