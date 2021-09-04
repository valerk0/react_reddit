import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { ChangeEvent, FormEvent, RefObject, useRef } from 'react';
import styles from './commentform.css';

export function CommentFormUncontrolled() {
  const ref = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(ref.current?.value);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea className={styles.input} ref={ref}/>
      <button type='submit' className={styles.button}>Комментировать</button>
    </form>
  );
}

interface ICommentFormProps {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (e: FormEvent) => void;
  textAreaRef?: RefObject<HTMLTextAreaElement>;
}

export function CommentFormControlled({ value, onChange, onSubmit, textAreaRef }: ICommentFormProps) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <textarea className={styles.input} value={value} onChange={onChange} ref={textAreaRef} />
      <button type='submit' className={styles.button}>Комментировать</button>
    </form>
  );
}

interface ICommentFormikProps {
  initialValue: string;
  validate: (values: any) => object;
  handleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function CommentFormFormik({ initialValue, validate, handleChange }: ICommentFormikProps) {
  return (
    <Formik
      initialValues={{textAreaInput: initialValue}}
      onSubmit={(values) => console.log(values)}
      validate={validate}
    >
      <Form className={styles.form}>
        <Field name='textAreaInput' component='textarea' className={styles.input} onKeyUp={handleChange} />
        <ErrorMessage name='textAreaInput' component='div' className={styles.errorMessage} />
        <button type='submit' className={styles.button}>Комментировать</button>
      </Form>
    </Formik>
  );
}
