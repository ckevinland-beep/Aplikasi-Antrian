-- Data awal users
INSERT INTO users (name, email, password_hash, role) VALUES
    ('Admin QueueApp', 'admin@queueapp.test',
     '$2b$10$xvpgJa6QoiLK431zvUNQbOtzBqAkswhAoFByQX1jMgfCEEfGD5WpC', 'ADMIN'),
    ('Petugas Loket', 'petugas@queueapp.test',
     '$2b$10$qBlFVQ03OFQfvWHvD4Cc2eHMOH4jiPmlxnLMC.mK.uBoox5wiX7nO', 'USER');


-- Data awal queues
INSERT INTO queues (queue_number, status, created_at, called_at, completed_at) VALUES
    ('A001', 'COMPLETED', '2026-09-04 08:02:00', '2026-09-04 08:05:00', '2026-09-04 08:11:00'),
    ('A002', 'COMPLETED', '2026-09-04 08:04:00', '2026-09-04 08:12:00', '2026-09-04 08:19:00'),
    ('A003', 'CALLED',    '2026-09-04 08:07:00', '2026-09-04 08:20:00', NULL),
    ('A004', 'WAITING',   '2026-09-04 08:15:00', NULL,                  NULL),
    ('A005', 'WAITING',   '2026-09-04 08:21:00', NULL,                  NULL);
