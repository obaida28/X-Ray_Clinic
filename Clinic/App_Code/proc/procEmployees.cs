using System;
using System.Collections.Generic;
using System.Data;

public class procEmployees : Initialization
{
    public procEmployees()
    {
        procName = "procEmployees";
        attNames = new string[] { "id", "clinicId", "name", "password", "state", "phone", "email", "type", "address", "image", "notes", "start_time", "end_time" };
        folder = "Employee";
    }
    public DataSet SelectEmployee(int id)
    {
        return Select("SelectEmployee", id);
    }
    public DataSet Login(object phone, object password)
    {
        setValues("phone", phone);
        setValues("password", password);
        return Select("Login");
    }
    private DataSet CheckPhone(string level, int id, string phone)
    {
        setValues("phone", phone);
        return Select(level, id);
    }
    public bool CheckPhone(int id, string phone)
    {
        DataSet ds = CheckPhone("SelectCheckPhone", id, phone);
        return ds.Tables[0].Rows.Count == 0;
    }
    public bool CheckPhone(string phone)
    {
        return CheckPhone(0, phone);
    }
    public bool CheckPhone(Dictionary<string, object> send)
    {
        string phoneKey = "phone";
        string idKey = "id";
        int id = 0;
        if (send.ContainsKey(idKey))
            id = Convert.ToInt32(send[idKey].ToString());
        if (send.ContainsKey(phoneKey))
            return CheckPhone(id, send[phoneKey].ToString());
        return true;
    }
    public DataSet SelectAll()
    {
        return Select("SelectAll");
    }
    public int SelectNewId()
    {
        DataSet ds = SelectNewId("SelectNewId");
        return Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString());
    }
    public bool ChangeState(int id)
    {
        return updateState(id, "Locked");
    }
    public bool Locked(int id)
    {
        return IsUpdated("Locked", id);
    }
}