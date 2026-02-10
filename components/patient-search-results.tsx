import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export default function PatientSearchResults({ results }: { results: any[] }) {
  return (
    <div className="mt-4">
        <h2 className="text-lg font-medium mb-2">Results</h2>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>DOB</TableHead>
                    <TableHead>Zipcode</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {results.map((patient, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="link">{patient.PREFIX} {patient.FIRST} {patient.LAST} {patient.SUFFIX}</Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>{patient.PREFIX} {patient.FIRST} {patient.LAST} {patient.SUFFIX}</SheetTitle>
                                        <SheetDescription>
                                            ID: {patient.id}
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-2 p-4">
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell><strong>First Name:</strong></TableCell>
                                                    <TableCell>{patient.FIRST}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell><strong>Last Name:</strong></TableCell>
                                                    <TableCell>{patient.LAST}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell><strong>Birthdate:</strong></TableCell>
                                                    <TableCell>{patient.BIRTHDATE}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell><strong>Gender:</strong></TableCell>
                                                    <TableCell>{patient.GENDER}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell><strong>Race:</strong></TableCell>
                                                    <TableCell>{patient.RACE}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell><strong>Ethnicity:</strong></TableCell>
                                                    <TableCell>{patient.ETHNICITY}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell><strong>Address:</strong></TableCell>
                                                    <TableCell className="max-w-xs break-words whitespace-normal">{patient.ADDRESS}, {patient.CITY}, {patient.STATE}, {patient.COUNTY} - {patient.ZIP}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell><strong>SSN:</strong></TableCell>
                                                    <TableCell>{patient.SSN}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </TableCell>
                        <TableCell>{patient.BIRTHDATE}</TableCell>
                        <TableCell>{patient.ZIP}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  );
}