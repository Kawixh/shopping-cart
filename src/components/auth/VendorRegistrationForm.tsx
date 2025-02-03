import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface VendorRegistrationFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  businessName: string;
  businessAddress: string;
  taxId: string;
  phoneNumber: string;
}

interface VendorRegistrationFormProps {
  selectedRole: "vendor";
}

export function VendorRegistrationForm({
  selectedRole,
}: VendorRegistrationFormProps) {
  const { register, handleSubmit } = useForm<VendorRegistrationFormData>();
  const { signUp, setActive } = useSignUp();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: VendorRegistrationFormData) => {
    if (!signUp) return;

    try {
      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        unsafeMetadata: {
          role: selectedRole,
          businessDetails: {
            businessName: data.businessName,
            businessAddress: data.businessAddress,
            taxId: data.taxId,
            phoneNumber: data.phoneNumber,
          },
        },
      });

      if (setActive) {
        await setActive({ session: result.createdSessionId });
        router.push("/vendor/dashboard");
      }
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || "An error occurred during registration");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
      <input {...register("email")} type="email" placeholder="Email" required />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        required
      />
      <input {...register("firstName")} placeholder="First Name" required />
      <input {...register("lastName")} placeholder="Last Name" required />
      <input
        {...register("businessName")}
        placeholder="Business Name"
        required
      />
      <input
        {...register("businessAddress")}
        placeholder="Business Address"
        required
      />
      <input {...register("taxId")} placeholder="Tax ID" />
      <input {...register("phoneNumber")} placeholder="Phone Number" required />

      {error && <div className="error">{error}</div>}
      <button type="submit">Register as Vendor</button>
    </form>
  );
}
