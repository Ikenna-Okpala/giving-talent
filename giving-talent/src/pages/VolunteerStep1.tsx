import { Input } from "../@/components/ui/input";
import { Label } from "../@/components/ui/label";

type Props = {
  formData: {
    name: string;
    email: string;
    number: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const VolunteerStep1 = ({ formData, handleInputChange}: Props) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          placeholder="Name:"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          value={formData.email}
          placeholder="Email:"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="number">Number</Label>
        <Input
          id="number"
          name="number"
          value={formData.number}
          placeholder="Number:"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default VolunteerStep1;
