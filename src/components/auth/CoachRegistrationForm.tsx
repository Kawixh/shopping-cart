import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface CoachRegistrationFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface CoachRegistrationFormProps {
  selectedRole: "coach";
}

export function CoachRegistrationForm({
  selectedRole,
}: CoachRegistrationFormProps) {
  const { register, handleSubmit } = useForm<CoachRegistrationFormData>();
  const { signUp, setActive } = useSignUp();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: CoachRegistrationFormData) => {
    if (!signUp) return;

    try {
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        unsafeMetadata: {
          role: selectedRole,
        },
      });

      if (setActive) {
        await setActive({ session: result.createdSessionId });
        router.push("/coach/dashboard");
      }
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || "An error occurred during registration");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} type="email" placeholder="Email" required />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        required
      />
      <input {...register("firstName")} placeholder="First Name" required />
      <input {...register("lastName")} placeholder="Last Name" required />

      {error && <div className="error">{error}</div>}
      <button type="submit">Register as Coach</button>
    </form>
  );
}
