import { ShowEvents } from "@/modules/collections";
import ShowTickets from "@/modules/collections/components/ShowTickets";

const Page = async () => {
    return (
        <main>
            <ShowTickets
                CW721POAAddress="andr1eajtel5wh0h7atyy35t2h45sr32n38w2e3nvjdd0fz8maz6hpmks2de4df"
                CW721TicketAddress="andr1t5rfxzn207pw83562dx6r3esfe3m4wcc49gyldxuydnh8mp79mysj2hcqk"
            />
        </main>
    );
};

export default Page;
