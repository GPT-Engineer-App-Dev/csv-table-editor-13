import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl mb-4">Welcome to the CSV Upload and Edit Tool</h1>
      <p className="mb-4">Upload, edit, and download CSV files with ease.</p>
      <Link to="/csv-upload-edit-tool">
        <Button variant="outline">Go to CSV Upload Edit Tool</Button>
      </Link>
    </div>
  );
};

export default Index;
