from detrain.tp.sequence_train_eval import sequence_train_eval

def train_eval(model_2d, train_dataloader, test_dataloader, loss_fn, optimizer, epochs, batch_size, device):
    sequence_train_eval(model_2d, train_dataloader, test_dataloader, loss_fn, optimizer, epochs, batch_size, device)