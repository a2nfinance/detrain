import connect from '@/database/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import Pipeline from "@/database/models/pipeline";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        // need to validate
        const {
            owner,
            state
        } = req.body;
        if (owner && state) {
            try {
                let pl = new Pipeline(req.body);
                let savePl = await pl.save();
                return res.status(200).send(savePl);
            } catch (error) {
                console.log(error)
                return res.status(500).send(error.message);
            }
        } else {
            res.status(422).send('data_incomplete');
        }
    } else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connect(handler);