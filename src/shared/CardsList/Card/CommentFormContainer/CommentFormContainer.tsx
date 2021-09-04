import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, updateComment } from '../../../../store/reducer';
import { CommentFormControlled, CommentFormFormik } from '../CommentForm/CommentForm';

export function CommentFormContainer() {

  const value = useSelector<IRootState, string>(state => state.commentText);
  const dispatch = useDispatch();

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    dispatch(updateComment(e.target.value));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <CommentFormControlled
      value={value}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

export function CommentFormFormikContainer() {
  const value = useSelector<IRootState, string>(state => state.commentText);
  const dispatch = useDispatch();

  const validate = (values: any) => {
    const errors: {textAreaInput?: string} = {};
    if (!values.textAreaInput) {
      errors.textAreaInput = 'Ввыдите текст комментария';
    } else if (values.textAreaInput.length < 5) {
      errors.textAreaInput = 'В комментарии должно быть не менее 5 букв'
    }
    return errors;
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateComment(e.target.value));
  }

  return (
    <CommentFormFormik initialValue={value} validate={validate} handleChange={handleChange} />
  );
}
