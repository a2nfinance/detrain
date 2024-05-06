from detrain.ppl.train import train_loop
from detrain.ppl.evaluation import test_loop
from detrain.ppl.args_util import get_args
from detrain.tp.model_utils import save_model

def run_master(model, train_dataloader, test_dataloader, loss_fn, optimizer, epochs, batch_size):
    args = get_args()
    # put the two model parts on worker1 and worker2 respectively
    # Validate master node here
    for t in range(epochs):
        print(f"Epoch {t+1}\n-------------------------------")
        train_loop(train_dataloader, model, loss_fn, optimizer, batch_size)
        test_loop(test_dataloader, model, loss_fn)
    save_model(model, args.model_name)
    print("Done!")

