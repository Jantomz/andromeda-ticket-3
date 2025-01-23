"use client";
import React, { FC, useEffect, useState } from "react";
import {
    useExecuteContract,
    useQueryContract,
    useSimulateExecute,
} from "@/lib/andrjs";
import useAndromedaClient from "@/lib/andrjs/hooks/useAndromedaClient";
import { useAndromedaStore } from "@/zustand/andromeda";

interface ApproveTicketProps {
    CW721POAAddress: string;
    ticket: string;
    CW721TicketAddress: string;
}

const ApproveTicket: FC<ApproveTicketProps> = (props) => {
    const client = useAndromedaClient();
    const { CW721POAAddress } = props;
    const { CW721TicketAddress } = props;
    const { ticket } = props;

    const [isLoading, setIsLoading] = useState(false);

    const { accounts } = useAndromedaStore();
    const account = accounts[0];
    const userAddress = account?.address ?? "";

    const execute = useExecuteContract(CW721POAAddress);
    const simulate = useSimulateExecute(CW721POAAddress);
    const query = useQueryContract(CW721TicketAddress);

    const handleApprove = async () => {
        // TODO: Make sure the ticket is not owned by the marketplace or the event creator, and has not been approved yet
        // TODO: Only the event creator can approve the ticket
        setIsLoading(true);
        if (!client || !userAddress) {
            setIsLoading(false);
            return;
        }

        const token = await query({
            all_nft_info: {
                token_id: ticket,
            },
        });

        const result = await simulate(
            {
                mint: {
                    token_id: ticket + "-approved",
                    extension: {
                        // TODO: Change this
                        publisher: "App Developer",
                    },
                    owner: token.access.owner,
                },
            },
            [{ denom: "uandr", amount: "500000" }]
        );

        const data = await execute(
            {
                mint: {
                    token_id: ticket + "-approved",
                    extension: {
                        publisher: "App Developer",
                    },
                    owner: token.access.owner,
                },
            },
            {
                amount: [
                    {
                        denom: result.amount[0].denom,
                        amount: result.amount[0].amount,
                    },
                ],
                gas: result.gas,
            }
        );

        console.log("data", data);

        if (!data.gasUsed) {
            return;
        }

        // TODO: show toast

        // Mint Tickets

        setIsLoading(false);

        // window.location.href = "/";
    };

    if (!client) {
        return <div className="text-red-500">Wallet Not Connected</div>;
    }
    return (
        <section className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Approve Ticket</h1>

            {isLoading ? (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                    <span className="ml-2 text-gray-700">Loading...</span>
                </div>
            ) : (
                <div>
                    <button
                        onClick={() => handleApprove()}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Approve Ticket
                    </button>
                </div>
            )}
        </section>
    );
};
export default ApproveTicket;
