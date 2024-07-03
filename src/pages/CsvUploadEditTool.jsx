import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { readString } from "react-papaparse";
import { saveAs } from "file-saver";

const CsvUploadEditTool = () => {
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvData = readString(e.target.result, { header: true });
      setHeaders(csvData.meta.fields);
      setTableData(csvData.data);
    };
    reader.readAsText(file);
  };

  const handleCellChange = (rowIndex, columnName, value) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][columnName] = value;
    setTableData(updatedData);
  };

  const addRow = () => {
    const newRow = headers.reduce((acc, header) => ({ ...acc, [header]: "" }), {});
    setTableData([...tableData, newRow]);
  };

  const removeRow = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData);
  };

  const downloadCsv = () => {
    const csvContent = [
      headers.join(","),
      ...tableData.map((row) => headers.map((header) => row[header]).join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "edited_data.csv");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">CSV Upload and Edit Tool</h1>
      <div className="mb-4 text-center">
        <Button variant="outline" as="label">
          Upload CSV
          <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
        </Button>
      </div>
      {tableData.length > 0 && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {headers.map((header) => (
                    <TableCell key={header}>
                      <Input
                        value={row[header]}
                        onChange={(e) => handleCellChange(rowIndex, header, e.target.value)}
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button variant="destructive" onClick={() => removeRow(rowIndex)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-between">
            <Button variant="outline" onClick={addRow}>
              Add Row
            </Button>
            <Button variant="outline" onClick={downloadCsv}>
              Download CSV
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CsvUploadEditTool;