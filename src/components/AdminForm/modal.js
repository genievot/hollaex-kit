import React, { Component } from 'react';
import renderFields from './utils';
import { reduxForm, reset } from 'redux-form';
import { Button, Modal } from 'antd';

const Form = (name, className = '', allowPristine = false) => {
	const ModalForm = ({
		handleSubmit,
		submitting,
		pristine,
		error,
		valid,
		fields,
		onSubmit,
		onCancel,
		title,
		buttonText,
		buttonType,
		small,
		visible
	}) => {
		// console.log(pristine || submitting || !valid, pristine, submitting, valid)
		return (
			<form className={className}>
				<Modal
					visible={visible}
					title={title}
					okText="Create"
					onCancel={onCancel}
					onOk={handleSubmit(onSubmit)}
				>
					{fields && renderFields(fields)}
					{error && (
						<div>
							<strong>{error}</strong>
						</div>
					)}
				</Modal>
			</form>
		);
	};

	return reduxForm({
		form: name,
		// onSubmitFail: (result, dispatch) => dispatch(reset(FORM_NAME)),
		onSubmitSuccess: (result, dispatch) => dispatch(reset(name)),
		enableReinitialize: true
	})(ModalForm);
};

export default Form;