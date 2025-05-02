/*
    Challenge: Implement a Secure Fund Transfer Function

    In this challenge, you will implement a PostgreSQL stored function to simulate transferring funds 
    between two accounts in a banking system. The function must follow proper validation, ensure data 
    integrity, and log transactions with a shared reference.

    Your function should be named:
    banking.transfer_funds(from_id INT, to_id INT, amount NUMERIC)

    The function must:

    - Prevent transfers to the same account
    - Ensure the transfer amount is greater than zero
    - Validate that both sender and recipient accounts exist
    - Prevent transfers if either account is marked as "frozen"
    - Ensure the sender has sufficient funds
    - Debit the sender and credit the recipient atomically
    - Log two transactions: a withdrawal and a deposit, both linked by the same UUID reference
    - Raise meaningful exceptions for all validation failures

    The function should perform all operations within a safe transactional context, maintaining 
    database consistency even in the event of failure.

    Notes:
    - In order to test you can mock some additional data in the tables that participates in this challenge.
    - Make sure of raising errors when they're present

    ERD:
    +---------------------+            +--------------------------+
    |     accounts        |            |      transactions        |
    +---------------------+            +--------------------------+
    | account_id (PK)     |<-----------| transaction_id (PK)      |
    | balance             |            | account_id (FK)          |
    | status              |            | amount                   |
    +---------------------+            | transaction_type         |
                                       | reference                |
                                       | transaction_date         |
                                       +--------------------------+
*/


-- your solution here
CREATE OR REPLACE FUNCTION banking.transfer_funds(
    from_id INT, 
    to_id INT, 
    amount NUMERIC
) RETURNS TEXT AS $$
DECLARE
    from_balance NUMERIC;
    to_balance NUMERIC;
    from_status TEXT;
    to_status TEXT;
    ref_number TEXT := 'T-' || from_id || '-' || to_id;
BEGIN
    IF from_id = to_id THEN
        RAISE EXCEPTION 'Cannot transfer to the same account';
    END IF;
    
    IF amount <= 0 THEN
        RAISE EXCEPTION 'Amount must be greater than 0';
    END IF;
    
    SELECT balance, status INTO from_balance, from_status
    FROM banking.accounts WHERE account_id = from_id FOR UPDATE;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Origin account does not exist';
    END IF;
    
    SELECT balance, status INTO to_balance, to_status
    FROM banking.accounts WHERE account_id = to_id FOR UPDATE;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'destination account does not exist';
    END IF;
    
    IF from_status != 'active' THEN
        RAISE EXCEPTION 'Origin account is not active';
    END IF;
    
    IF to_status != 'active' THEN
        RAISE EXCEPTION 'Destination account is not active';
    END IF;
    
    IF from_balance < amount THEN
        RAISE EXCEPTION 'Insufficient funds';
    END IF;
    
    UPDATE banking.accounts SET balance = balance - amount 
    WHERE account_id = from_id;
    
    UPDATE banking.accounts SET balance = balance + amount 
    WHERE account_id = to_id;
    
    INSERT INTO banking.transactions (account_id, amount, transaction_type, reference)
    VALUES (from_id, amount, 'withdrawal', ref_number),
           (to_id, amount, 'deposit', ref_number);
    
    RETURN 'Transfer successful. Reference: ' || ref_number;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
$$ LANGUAGE plpgsql;