import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import PatientDetails from "./patient-details";


export default function PatientSheet({ patient }: { patient: any }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="link">{patient.PREFIX} {patient.FIRST} {patient.LAST} {patient.SUFFIX}</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        <Link href={`/patientdetails/${patient.id}`} className="text-lg font-bold text-[#00703f] hover:underline">
                            {patient.PREFIX} {patient.FIRST} {patient.LAST} {patient.SUFFIX}
                        </Link>
                    </SheetTitle>
                    <SheetDescription>
                        ID: {patient.id}
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-2 p-4">
                    <PatientDetails patient={patient} />
                </div>
            </SheetContent>
        </Sheet>
    );
}