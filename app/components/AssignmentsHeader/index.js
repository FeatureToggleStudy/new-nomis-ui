import React from 'react';
import PropTypes from 'prop-types';
import { toFullName } from 'utils/stringUtils';

import { AssignmentsHeaderWrapper,
  PortraitImage,
  UserName,
  CaseLoad,
  YouHaveAssignments,
  NotificationNumberAssignments,
  ResultsViewToggleWrapper,
} from './theme';


function AssignmentsHeader({ user, options, resultsViewToggle }) {
  return user && (
    <AssignmentsHeaderWrapper>
      <PortraitImage background={'/img/assignmentsHeader-missing-portrait.png'} />
      <UserName>
        {toFullName({
          firstName: user.firstName,
          lastName: user.lastName,
          name: user.name,
        })}
      </UserName>

      <CaseLoad>{user.activeCaseLoadId}</CaseLoad>

      <YouHaveAssignments>
        <span>You have </span>
        <NotificationNumberAssignments>{options.assignments} &nbsp;</NotificationNumberAssignments>
        <span>Assignments</span>
      </YouHaveAssignments>

      <ResultsViewToggleWrapper>
        {resultsViewToggle}
      </ResultsViewToggleWrapper>
    </AssignmentsHeaderWrapper>
  );
}

AssignmentsHeader.propTypes = {
  user: PropTypes.object,
  options: PropTypes.object,
  resultsViewToggle: PropTypes.object.isRequired,
};

AssignmentsHeader.defaultProps = {
  user: {
    firstName: 'first',
    activeCaseLoadId: 'id',
  },
  options: {
    assignments: 12,
    facilities: ['Sheffield', 'Cloverfield'],
  },
};

export default AssignmentsHeader;
