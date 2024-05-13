import { QueryDeploymentsResponse, QueryDeploymentsRequest, QueryClientImpl } from "@akashnetwork/akashjs/build/protobuf/akash/deployment/v1beta3/query";
import { QueryClientImpl as LeaseCLI, QueryLeaseRequest, QueryLeaseResponse } from "@akashnetwork/akashjs/build/protobuf/akash/market/v1beta3/query";
import { getRpc } from "@akashnetwork/akashjs/build/rpc";
import { store } from "@/controller/store"
import { setFormsProps } from "@/controller/setup/setupFormsSlice";
export const useAkash = () => {
    const rpcEndPoint = "https://rpc.akashnet.net:443";
    const getLeaseStatus = async (address: string, desq: string | number | Long.Long | undefined) => {
        const client = new LeaseCLI(await getRpc(rpcEndPoint));

        const getLeaseStatusRequest = QueryLeaseRequest.fromPartial({
            id: {
                owner: address,
                // provider: "dcloud",
                dseq: desq, // deployment dseq
                // gseq: 1, // most of the time the value is 1
                // oseq: 1 // most of the time the value is 1
            }
        });

        const leaseStatusResponse = await client.Lease(getLeaseStatusRequest);
        const data = QueryLeaseResponse.toJSON(leaseStatusResponse);

        return data
    }
    const getDeployment = async (address: string) => {
        try {
            const request = QueryDeploymentsRequest.fromJSON({
                filters: {
                    owner: address,
                    state: "active"
                }
            });

            const client = new QueryClientImpl(await getRpc(rpcEndPoint));
            const response = await client.Deployments(request);
            // @ts-ignore
            const data: { deployments: any[], pagination: { nextKey: string, total: string } } = QueryDeploymentsResponse.toJSON(response);
            console.log(data);
            const getDeploymentIds = data.deployments.map(m => m.deployment.deploymentId);

            const getLeases = await Promise.all(getDeploymentIds.map(id =>
                getLeaseStatus(address, id.dseq)
            ))

            let results: any[] = [];
            for (let i = 0; i < getLeases.length; i++) {
                let result = getLeases[i];
                results.push(result);
            }
            console.log(results);
            store.dispatch(setFormsProps({ att: "deployments", value: results }))
        } catch (e) {
            console.log(e);
        }

    }

    return { getDeployment }
}