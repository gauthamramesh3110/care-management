import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export default function PatientSearchResults({ results }: { results: any[] }) {
  return (
    <div className="mt-4">
        <h2 className="text-lg font-medium mb-2">Results</h2>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>DOB</TableHead>
                    <TableHead>Zipcode</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {results.map((patient, index) => (
                    <TableRow key={index}>
                        <TableCell>{patient.FIRST}</TableCell>
                        <TableCell>{patient.LAST}</TableCell>
                        <TableCell>{patient.BIRTHDATE}</TableCell>
                        <TableCell>{patient.ZIP}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  );
}