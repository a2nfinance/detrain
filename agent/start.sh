git clone 
ln -s /mnt/data/detrain/agent/detrain_agent.service  /usr/lib/systemd/system/detrain_agent.service
systemctl daemon-reload
systemctl start detrain_agent.service