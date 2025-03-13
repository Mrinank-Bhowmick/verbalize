# API Documentation

## Agent Endpoints

| Operation         | Endpoint                                    | Description                                            |
| ----------------- | ------------------------------------------- | ------------------------------------------------------ |
| Get All Agents    | `GET /clients/:clientId/agents`             | Retrieves all agents associated with a specific client |
| Get Agent Details | `GET /clients/:clientId/agents/:agentId`    | Retrieves detailed information about a specific agent  |
| Create Agent      | `POST /clients/:clientId/agents`            | Creates a new agent for a specific client              |
| Update Agent      | `PUT /clients/:clientId/agents/:agentId`    | Updates the information of an existing agent           |
| Delete Agent      | `DELETE /clients/:clientId/agents/:agentId` | Removes an agent from the system                       |
