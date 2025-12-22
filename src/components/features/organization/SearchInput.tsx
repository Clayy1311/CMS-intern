import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

type Props = {
  onCreateClick: () => void;
};

export default function SearchInput({ onCreateClick }: Props) {
  return (
    <main className="w-full space-y-4">
      <div className="flex items-center gap-6">
        <Input
          type="text"
          placeholder="Search..."
          className="w-full"
        />
        <Button
          onClick={onCreateClick}
          className="bg-[#3A7AC3] px-10"
        >
          Create Project
        </Button>
      </div>

      <div className="grid grid-cols-3 bg-[#3A7AC3] rounded-sm text-white">
        <div className="p-3">Nama Organizational</div>
        <div className="p-3">Collaborator</div>
        <div className="p-3">Action</div>
      </div>
    </main>
  );
}
