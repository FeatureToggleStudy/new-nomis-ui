import { createSelector } from 'reselect'

const selectLocations = () => state => state.getIn(['eliteApiLoader', 'Locations', 'ids']).toJS()

const selectLocationId = () => (_, props) => props.locationId

export default () =>
  createSelector(
    selectLocations(),
    selectLocationId(),
    (locations, id) => {
      const loc = locations[`${id}`]
      if (!loc) {
        return { description: 'not available' }
      }
      return loc
    }
  )
