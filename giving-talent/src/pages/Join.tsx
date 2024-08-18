import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";
import VolunteerStep1 from "./VolunteerStep1";
import { Button } from "../@/components/ui/button";
import VolunteerStep2 from "./VolunteerStep2";
import VolunteerStep3 from "./VolunteerStep3";
import { Progress } from "../@/components/ui/progress";

type FormData = {
  name: string;
  email: string;
  number: string;
  age: string;
  countryOrigin: string;
  countryTrained: string;
  volunteerHours: string;
  eventType: string;
  talent: string;
};

const JoinVolunteer = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    number: "",
    age: "",
    countryOrigin: "",
    countryTrained: "",
    eventType: "",
    volunteerHours: "",
    talent: "",
  });

  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("form submitted");
    console.log("Form data to be submitted:", JSON.stringify(formData, null, 2));
    // Perform POST request to your API
    try {
      const response = await fetch("https://giving-talent-qscn72z4ba-uc.a.run.app/volunteers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setNotification({ type: "success", message: "Form submitted successfully!" });
      } else {
        setNotification({ type: "error", message: "Form submission failed. Please try again." });
      }
    } catch (error) {
      setNotification({ type: "error", message: "An error occurred while submitting the form." });
      // Handle network errors or other issues
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen">
      <Card className="w-[600px]">
        <CardHeader className="space-y-5">
          <CardTitle>Join us as a volunteer</CardTitle>
          <Progress value={(step / 3) * 100} className="w-[60%]" />
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            {step === 1 && <VolunteerStep1 formData={formData} handleInputChange={handleInputChange} />}
            {step === 2 && <VolunteerStep2 formData={formData} handleInputChange={handleInputChange} />}
            {step === 3 && <VolunteerStep3 formData={formData} handleInputChange={handleInputChange} />}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button type="button" onClick={prevStep}>
              Previous
            </Button>
          )}
          {step < 3 && (
            <Button type="button" onClick={nextStep} className="ml-auto">
              Next
            </Button>
          )}
          {step >= 3 && (
            <Button type="button" onClick={submit}>
              Submit
            </Button>
          )}
        </CardFooter>
      </Card>
      {notification && (
        <div className={`mt-4 p-4 text-white ${notification.type === "success" ? "bg-green-500" : "bg-red-500"} rounded`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default JoinVolunteer;
