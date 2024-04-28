import torch
from torch.utils.data import DataLoader
from torchvision import datasets
from torchvision.transforms import ToTensor
import torchvision.transforms as transforms

def get_torchvision_dataset(name, batch_size):
    if (name == "MNIST"):
        training_data = datasets.FashionMNIST(
        root="data",
        train=True,
        download=True,
        transform=ToTensor()
        )

        test_data = datasets.FashionMNIST(
            root="data",
            train=False,
            download=True,
            transform=ToTensor()
        )

        train_dataloader = DataLoader(training_data, batch_size=batch_size)
        test_dataloader = DataLoader(test_data, batch_size=batch_size)

        return (train_dataloader, test_dataloader)
    elif (name == "ImageNet"):
        #Prepare transformations for data augmentation
        transform = transforms.Compose([
            transforms.Resize(256),
            transforms.RandomHorizontalFlip(),
            transforms.RandomVerticalFlip(),
            transforms.RandomRotation(degrees=45),
            transforms.ColorJitter(brightness=0.5, contrast=0.5, saturation=0.5, hue=0.5),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])
        train_dataset = datasets.ImageNet(
            root='/mnt/d/WP/Blockchain/Projects/detrain/data', 
            split="train",
            download=True,
            transform=transform
        )
        test_dataset = datasets.ImageNet(
            root='/mnt/d/WP/Blockchain/Projects/detrain/data', 
            split="eval",
            download=True,
            transform=transform
        )
        train_dataloader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True, num_workers=2)
        test_dataloader = DataLoader(test_dataset, batch_size=batch_size, shuffle=True, num_workers=2)
        return (train_dataloader, test_dataloader)
         

