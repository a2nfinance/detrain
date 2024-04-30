from torch.distributed.tensor.parallel import loss_parallel


def train_loop(dataloader, tp_model, loss_fn, optimizer, batch_size, device):
    size = len(dataloader.dataset)
    # Set the model to training mode - important for batch normalization and dropout layers
    # Unnecessary in this situation but added for best practices
    for batch, (X, y) in enumerate(dataloader):

        pred = tp_model(X.to(device))
        y = y.to(device)
        with loss_parallel():
            loss = loss_fn(pred, y)
            loss.backward()
            optimizer.step()
        if batch % 100 == 0:
            loss, current = loss.item(), batch * batch_size + len(X)
            print(f"loss: {loss:>7f}  [{current:>5d}/{size:>5d}]")