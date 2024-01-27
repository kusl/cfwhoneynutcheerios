-- Create the pgcrypto extension if it doesn't exist
-- This extension provides the gen_random_uuid() function
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create a table named requests
CREATE TABLE requests (
  -- Add a guid column named id as the primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
  -- Add a jsonb column named payload to store the request body
  payload JSONB NOT NULL,
  -- Add a inet column named ipv4 to store the IPv4 address of the client
  ipv4 INET NOT NULL,
  -- Add a varchar column named ipv6 to store the country code of the client
  ipv6 VARCHAR NOT NULL,
  -- Add a text column named current_url to store the request URL
  current_url TEXT NOT NULL,
  -- Add a text column named referring_url to store the referrer URL
  referring_url TEXT NOT NULL,
  -- Add a timestamp column named request_time to store the request time
  request_time TIMESTAMP NOT NULL
);
