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
  countryOg: string;
  countryTrained: string;
  volunteerHours: string;
  eventType: string;
};

const JoinVolunteer = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    number: "",
    age: "",
    countryOg: "",
    countryTrained: "",
    eventType: "",
    volunteerHours: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("form submitted");
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
            {step === 1 && <VolunteerStep1 />}

            {step === 2 && <VolunteerStep2 />}

            {step === 3 && <VolunteerStep3 />}
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
    </div>
  );
};

export default JoinVolunteer;
