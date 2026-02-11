import PatientDetails from "@/components/patient-details";

export default async function PatientDetailsPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/patients/${id}`;
    console.log('Fetching patient details from:', url);
    const res = await fetch(url);
    const patient = await res.json();
    return (
        <div className="p-4 flex flex-row gap-4">
            <div className="bg-gray-100 p-4 rounded w-1/3">
                <h2 className="text-xl font-bold mb-4">Patient Details</h2>
                <PatientDetails patient={patient} />
            </div>
            <div className="bg-gray-100 p-4 rounded w-2/3">
                <h2 className="text-xl font-bold mb-4">Clinical Details</h2>
            </div>
        </div>
    );
}