import React from 'react';
import { useMutation, useQuery } from 'react-query';

export type FormProps = {
  onSubmit: () => void;
};

export const Form: React.FC<FormProps> = (props) => {
  const { data, isLoading } = useQuery(
    'form',
    () =>
      fetch('/api/form', {
        method: 'GET',
      }),
    {
      onError: (error) => {
        console.error(error);
      },
    },
  );

  const { mutate } = useMutation(
    () =>
      fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({}),
      }),
    {
      onSuccess: () => {
        props.onSubmit();
      },
      onError: (error) => {
        console.error(error);
      },
    },
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>form</h1>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Form;
