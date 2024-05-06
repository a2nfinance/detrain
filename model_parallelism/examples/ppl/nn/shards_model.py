import torch.nn as nn  
from base_model import NeuralNetwork

class NNShard1(NeuralNetwork):
    """
    The first part of NeuralNetwork.
    """
    def __init__(self, device, *args, **kwargs):
        super(NNShard1, self).__init__(*args, **kwargs)

        self.device = device
        self.seq = nn.Sequential(
            nn.Linear(28*28, 512),
            nn.ReLU(),
            nn.Linear(512, 512),
        ).to(self.device)

    def forward(self, x_rref):
        x = x_rref.to_here().to(self.device)
        x = self.flatten(x)
        with self._lock:
            out =  self.seq(x)
        # print(f"Run forward on worker[1] - Device: {self.device}")
        return out.cpu()
    
class NNShard2(NeuralNetwork):
    """
    The first part of NeuralNetwork.
    """
    def __init__(self, device, *args, **kwargs):
        super(NNShard2, self).__init__(*args, **kwargs)

        self.device = device
        self.seq = nn.Sequential(
            nn.ReLU(),
            nn.Linear(512, 10),
        ).to(self.device)

    def forward(self, x_rref):
        x = x_rref.to_here().to(self.device)
        x = self.flatten(x)
        with self._lock:
            out =  self.seq(x)
        # print(f"Run forward on worker[2] - Device: {self.device}")
        return out.cpu()