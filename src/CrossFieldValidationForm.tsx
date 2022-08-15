import { useForm } from "react-hook-form";

export const SimpleAsyncValidatonForm = () => {
  const {
    register,
    formState: { isValidating, isSubmitting },
    handleSubmit
  } = useForm({
    defaultValues: {
      test: ""
    },
    resolver: async (data) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return {
        values: data,
        errors: {}
      };
    }
  });

  const onSubmit = (data: unknown) => {
    console.log("ready to submit", data);
  };

  console.log("isValidating", isValidating);
  console.log("isSubmitting", isSubmitting);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Is submitting? {isSubmitting.toString()}</h2>
      <h2>Is validating? {isValidating.toString()}</h2>
      <label>Test</label>
      <input {...register("test")} />
      {!isValidating ? <input type="submit" /> : null}
    </form>
  );
};
