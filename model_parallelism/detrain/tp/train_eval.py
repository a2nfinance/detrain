from detrain.tp.train import train_loop
from detrain.tp.evaluation import test_loop
def train_eval(tp_model, train_dataloader, test_dataloader, loss_fn, optimizer, epochs, batch_size, device):
    # Validate master node here
    for t in range(epochs):
        print(f"Epoch {t+1}\n-------------------------------")
        train_loop(train_dataloader, tp_model, loss_fn, optimizer, batch_size, device)
        # test_loop(test_dataloader, tp_model, loss_fn)
    print("Done!")