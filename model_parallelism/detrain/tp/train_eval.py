from detrain.tp.train import train_loop
from detrain.tp.evaluation import test_loop
import os
def train_eval(tp_model, train_dataloader, test_dataloader, loss_fn, optimizer, epochs, batch_size, device):
    rank = int(os.environ["RANK"])
    # Validate master node here
    for t in range(epochs):
        print(f"\nRank{rank} -- Epoch {t+1} start\n-------------------------------")
        train_loop(train_dataloader, tp_model, loss_fn, optimizer, batch_size, device, rank)
        # if (rank == 0):
        #     test_loop(test_dataloader, tp_model, loss_fn, device)
    print("Done!")