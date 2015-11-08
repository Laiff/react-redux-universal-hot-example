const isNotNull = mayBePresent => !!mayBePresent;

function withMethod(methodName) {
  return function withComponent(component) {
    return component.WrappedComponent ?
      withComponent(component.WrappedComponent) :
      component[methodName];
  };
}

const fetchData = withMethod('fetchData');
const fetchDataDeferred = withMethod('fetchDataDeferred');

export default (components, getState, dispatch, location, params, deferred) => {
  const toFetcher = deferred ? fetchDataDeferred : fetchData;
  const toPromise = fetcher => fetcher(getState, dispatch, location, params);

  return components
    .map(toFetcher)
    .filter(isNotNull)
    .map(toPromise);
};
