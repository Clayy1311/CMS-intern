import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = { 
    onCreateClick: () => void;
};

export default function SearchInput({ onCreateClick }: Props) {
    return (
        <main className="w-full space-y-4">
            <div className="flex items-center gap-6">
                <Input
                    type="text"
                    placeholder="Search project..."
                    className="w-full"
                />
                <Button
                    onClick={onCreateClick}
                    className="bg-[#3A7AC3] px-10"
                >
                    Create Project
                </Button>
            </div>

          
        </main>
    );
}
