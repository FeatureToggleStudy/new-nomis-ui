import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form/immutable';
import Button, { ButtonRow } from 'components/Button';

import { Select, SubmissionError, TextArea } from 'components/FormComponents';

const AddCaseNoteForm = (props) => {
  const { handleSubmit, submitting, error, caseNoteTypeList, caseNoteSubTypeList, closeModal } = props;
  return (
    <form onSubmit={handleSubmit}>
      <SubmissionError error={error}>{error}</SubmissionError>
      <div>
        <Field name="caseNoteType" component={Select} options={caseNoteTypeList} title="Select Case Note Type" subTitle="Select Case Note SubType" />
      </div>
      <div>
        <Field name="caseNoteSubType" component={Select} options={caseNoteSubTypeList} title="Select Case Note SubType" />
      </div>
      <div>
        <Field name="caseNoteText" component={TextArea} type="number" title="Case Note" autocomplete="off" />
      </div>
      <ButtonRow>
        <Button disabled={submitting} buttonstyle="cancel" onClick={closeModal}>Cancel</Button>
        <Button type="submit" disabled={submitting} submitting={submitting} buttonstyle="link">Submit</Button>
      </ButtonRow>
    </form>
  );
};

AddCaseNoteForm.propTypes = {
  caseNoteTypeList: PropTypes.array.isRequired,
  caseNoteSubTypeList: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

AddCaseNoteForm.defaultProps = {
  error: '',
};

export default reduxForm({
  form: 'addCaseNote', // a unique identifier for this form
})(AddCaseNoteForm);