using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Initialization is a class that contains five sections:
/// Query methods, transform methods, basic methods, initialization methods, database communication methods
/// </summary>
[System.Web.Script.Services.ScriptService]
public class Initialization : System.Web.Services.WebService
{
    private const bool Online = true;
    private const string currentZone = "Syria Standard Time";
    private const string OnlineConnection = "Connection";
    private const string LocalConnection = "localDB";
    protected string procName;
    protected string level;
    protected string[] attNames;
    public Dictionary<string, object> currentatt;
    public string folder;
    public Initialization()
    {
        currentatt = new Dictionary<string, object>();
    }
    /*Quaries*/
    public DataSet Insert(string level , Dictionary<string, object> lst)
    {
        return Quary(level, lst);
    }
    public DataSet Insert(Dictionary<string, object> lst)
    {
        return Insert("Insert", lst);
    }
    public DataSet InsertWithImage(Dictionary<string, object> lst, object id, string img)
    {
        setValues("id", id);
        setValues("image", img);
        return Insert("InsertwithImage", lst);
    }
    public DataSet Update(string level, Dictionary<string, object> lst)
    {
        return Quary(level, lst);
    }
    public DataSet Update(string level, int id)
    {
        return Quary(level, id);
    }
    public DataSet Update(Dictionary<string, object> lst)
    {
        return Update("Update", lst);
    }
    public string Update(DataSet ds)
    {
        string colName = ds.Tables[0].Columns[0].ColumnName;
        string value = ds.Tables[0].Rows[0][colName].ToString();
        if (colName == "msg")
            Throw(value);
        return value;
    }
    public bool IsUpdated(Dictionary<string, object> lst)
    {
        return IsUpdated("Update", lst);
    }
    public bool IsUpdated(string level, int id)
    {
        DataSet ds = Update(level, id);
        return rowAffected(ds) > 0;
    }
    public bool IsUpdated(string level, Dictionary<string, object> lst)
    {
        DataSet ds = Update(level, lst);
        return rowAffected(ds) > 0;
    }
    public bool updateState(int id, string state)
    {
        setValues("state", state);
        return IsUpdated("UpdateState", id);
    }
    public int rowAffected(DataRow dr)
    {
        return Convert.ToInt32(dr["rowAffected"].ToString());
    }
    public int rowAffected(DataTable dt)
    {
        return rowAffected(dt.Rows[0]);
    }
    public int rowAffected(DataSet ds)
    {
        return rowAffected(ds.Tables[0]);
    }
    protected DataSet SelectNewId(string level)
    {
        return Select(level);
    }
    public DataSet Select(string level, int id)
    {
        return Quary(level, id);
    }
    public DataSet Select(string level)
    {
        return Quary(level);
    }
    private DataSet Quary(string level, int id)
    {
        setValues("id", id);
        return Quary(level);
    }
    private DataSet Quary(string level)
    {
        this.level = level;
        return initProc();
    }
    private DataSet Quary(string level, Dictionary<string, object> lst)
    {
        this.level = level;
        return initProc(lst);
    }
    /*Converts*/
    /// <summary>
    /// Convert String To JSON
    /// </summary>
    /// <param name="str"></param>
    /// <returns></returns>
    public JObject StringToJSON(string str)
    {
        return JObject.Parse(str);
    }
    /// <summary>
    /// Convert The first row in DataTable To JSON 
    /// </summary>
    /// <param name="dt"></param>
    /// <returns></returns>
    public JObject RowToJSON(DataTable dt)
    {
        DataRow dr = dt.Rows[0];
        DataColumnCollection cols = dt.Columns;
        return RowToJSON(dr, cols);
    }
    /// <summary>
    /// Convert DataRow To JSON
    /// </summary>
    /// <param name="dr"></param>
    /// <param name="Columns"></param>
    /// <returns></returns>
    public JObject RowToJSON(DataRow dr, DataColumnCollection Columns)
    {
        JObject json = new JObject();
        foreach (DataColumn dc in Columns)
            json[dc.ColumnName] = dr[dc.ColumnName].ToString().Trim();
        return json;
    }
    /// <summary>
    /// Convert DataTable To JSON of JSON
    /// </summary>
    /// <param name="dt"></param>
    /// <returns></returns>
    public JObject TableToJSON(DataTable dt)
    {
        DataColumnCollection cols = dt.Columns;
        JObject json = new JObject();
        foreach (DataRow dr in dt.Rows)
            json["row" + dt.Rows.IndexOf(dr)] = RowToJSON(dr, cols);
        return json;
    }
    /// <summary>
    /// Convert DataTable To Array of JSON
    /// </summary>
    /// <param name="dt"></param>
    /// <returns></returns>
    public JArray TableToArray(DataTable dt)
    {
        DataColumnCollection cols = dt.Columns;
        JArray arr = new JArray();
        foreach (DataRow dr in dt.Rows)
            arr.Add(RowToJSON(dr, cols));
        return arr;
    }
    /// <summary>
    /// Convert JSON To Dictionary
    /// </summary>
    /// <param name="jobj"></param>
    /// <returns></returns>
    public Dictionary<string, object> JSONToDic(JObject jobj)
    {
        var list = new Dictionary<string, object>();
        foreach (JProperty property in jobj.Properties())
            list.Add(property.Name, property.Value);
        return list;
    }
    /// <summary>
    /// Convert JSON To DataTable
    /// </summary>
    /// <param name="jobj"></param>
    /// <returns></returns>
    public DataTable JSONToTable(JObject jobj)
    {
        var dt = new DataTable();
        foreach (JProperty property in jobj.Properties())
            dt.Columns.Add(property.Name);
        DataRow dr;
        foreach (JProperty property in jobj.Properties())
        {
            dr = dt.NewRow();
            var arr = property.Value as JArray;
            int index = 0;
            foreach (DataColumn dc in dt.Columns)
                dr[dc] = arr[index++];
            dt.Rows.Add(dr);
        }
        return dt;
    }
    public Dictionary<string, object> StringToDic(string str, string[] keys , string[] values)
    {
        var dic = StringToDic(str);
        return AddToDic(dic, keys, values); 
    }
    public Dictionary<string, object> AddToDic(Dictionary<string, object> dic, string[] keys, string[] values)
    {
        for (int i = 0; i < Math.Min(keys.Length, values.Length); ++i)
            dic.Add(keys[i], values[i]);
        return dic;
    }
    /// <summary>
    /// Convert String To Dictionary
    /// </summary>
    /// <param name="str"></param>
    /// <returns></returns>
    public Dictionary<string, object> StringToDic(string str)
    {
        var json = StringToJSON(str);
        return JSONToDic(json);
    }
    /*basic func*/
    /// <summary>
    /// return name of procedure attributes without level
    /// </summary>
    /// <returns></returns>
    public string[] get_attNames()
    {
        return attNames;
    }
    /// <summary>
    /// return value of "Parent" from Form-Data inputed 
    /// </summary>
    /// <returns></returns>
    public string get_parent()
    {
        return get_param("parent");
    }
    /// <summary>
    /// return value of parameter name from Form-Data inputed
    /// </summary>
    /// <param name="param_name"></param>
    /// <returns></returns>
    public string get_param(string param_name)
    {
        return HttpContext.Current.Request.Params.Get(param_name);
    }
    /// <summary>
    /// return Dictionary of Form-Data inputed
    /// </summary>
    /// <returns></returns>
    public Dictionary<string, object> get_send()
    {
        Dictionary<string, object> send = new Dictionary<string, object>();
        var Params = HttpContext.Current.Request.Params;
        var keys = Params.AllKeys.ToList();
        var atts = get_attNames();
        foreach (string param in atts)
            if (keys.Contains(param))
                send.Add(param, Params.Get(param));
        return send;
    }
    /// <summary>
    /// return time of Current Time
    /// </summary>
    /// <returns></returns>
    public DateTime time()
    {
        var remoteTimeZone = TimeZoneInfo.FindSystemTimeZoneById(currentZone);
        var remoteTime = TimeZoneInfo.ConvertTime(DateTime.Now, remoteTimeZone);
        return remoteTime;
    }
    public void Throw(string msg)
    {
        throw new Exception(msg);
    }
    public DataTable appendColumnValue(DataSet ds, string columnName, string textAdded, bool before)
    {
        DataTable dt = ds.Tables[0];
        return appendColumnValue(dt, columnName, textAdded, before);
    }
    public DataTable appendColumnValue(DataTable dt, string columnName, string textAdded , bool before)
    {
        foreach (DataRow dr in dt.Rows)
            dr[columnName] = before ? (textAdded + dr[columnName].ToString()) : (dr[columnName].ToString() + textAdded);
        return dt;
    }
    public DataTable ChangeColumnValue(DataTable dt, string columnName, string textAdded)
    {
        foreach (DataRow dr in dt.Rows)
            dr[columnName] = textAdded;
        return dt;
    }
    public bool CheckInteger(string str)
    {
        try { Convert.ToInt32(str); return true; } catch { return false; }
    }
    /// <summary>
    /// Add level to the current procedure attributes 
    /// </summary>
    private void addLevel()
    {
        currentatt.Add("level",level);
    }
    /// <summary>
    /// Add Attribure to the current procedure with his value
    /// </summary>
    /// <param name="attName"></param>
    /// <param name="attValue"></param>
    private void addWithValue(string attName, object attValue)
    {
        if (!attNames.Contains(attName))
            throw new Exception(attName + " : this attribute not in this procedure!");
        if (currentatt.ContainsKey(attName))
            throw new Exception(attName + " : this attribute added recently!");
        currentatt.Add(attName, attValue);
    }
    /// <summary>
    /// Clear all of attribute added!
    /// </summary>
    private void clear()
    {
        currentatt.Clear();
    }
    /// <summary>
    /// Add "@" before All Attribute added !
    /// </summary>
    /// <returns></returns>
    private Dictionary<string, object> AddAt()
    {
        Dictionary<string,object> res = new Dictionary<string, object>();
        foreach (var str in currentatt)
            res.Add("@" + str.Key, str.Value);
        return res;
    }
    /// <summary>
    /// 
    /// </summary>
    /// <param name="name"></param>
    /// <param name="value"></param>
    public void setValues(string name, object value)
    {
        addWithValue(name, value);
    }
    public void setValues(int index, string value)
    {
        setValues(attNames[index], value);
    }
    public string PrintDic(Dictionary<string, object> send)
    {
        string str = "";
        foreach (var obj in send)
            str += obj.Key + ":" + obj.Value + "_";
        return str;
    }
    public string saveImage(Dictionary<string, object> send, string root)
    {
        return saveImage(send["id"].ToString(), root);
    }
    public string saveImage(int id, string root)
    {
        return saveImage(id.ToString(), root);
    }
    public string saveImage(string img_name, string root)
    {
        Image img = new Image(img_name, ".jpg", root);
        return img.save();
    }
    public JObject msg(string message)
    {
        return ToJSON("message", message);
    }
    /*init*/
    protected DataSet initProc(Dictionary<string, object> lst)
    {
        foreach (var obj in lst)
            setValues(obj.Key, obj.Value);
        return initProc();
    }
    protected DataSet initProc()
    {
        return procDB();
    }
    protected DataSet init(string q, string[] names, string[] values)
    {
        return init(q, names, values, false);
    }
    protected DataSet init(string q)
    {
        return init(q, new string[] { }, new string[] { }, false);
    }
    protected DataSet init(string q, bool IsStoreProcedure)
    {
        return init(q, new string[] { }, new string[] { }, IsStoreProcedure);
    }
    protected DataSet init(string q, string[] names, object[] values, bool IsStoreProcedure)
    {
        return DB(q, names, values, IsStoreProcedure);
    }
    /*finish*/
    /// <summary>
    /// show result (object) 
    /// </summary>
    /// <param name="obj"></param>
    public void finish(object obj)
    {
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.ContentType = "application/json";
        //HttpContext.Current.Response.AddHeader("content-length", (obj.ToString().Length).ToString());
        HttpContext.Current.Response.Write(obj);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
    /// <summary>
    /// Show this string as message
    /// </summary>
    /// <param name="str"></param>
    public void String(string str)
    {
        finish(msg(str));
    }
    /// <summary>
    /// Check if this DataSet is Empty or Not !
    /// </summary>
    /// <param name="ds"></param>
    /// <returns></returns>
    public bool IsEmpty(DataSet ds)
    {
        return ds.Tables.Count == 0 || ds.Tables[0].Rows.Count == 0;
    }
    /// <summary>
    /// Check if this DataTable is Empty or Not !
    /// </summary>
    /// <param name="dt"></param>
    /// <returns></returns>
    public bool IsEmpty(DataTable dt)
    {
        return dt.Rows.Count == 0;
    }
    public void Empty(bool WithException)
    {
        if (WithException)
            throw new Exception("no data found!");
        finish(new JArray());
    }
    public JObject ToJSON(string key , object value)
    {
        return ToJSON(new string[] { key }, new object[] { value });
    }
    public JObject ToJSON(string[] keys, object[] values)
    {
        JObject json = new JObject();
        for (int i = 0; i < Math.Min(keys.Length,values.Length); ++i)
            json[keys[i]] = values[i].ToString();
        return json;
    }
    public void JSON(string key , object value)
    {
        JObject json = ToJSON(key, value);
        finish(json);
    }
    public void Set(DataSet ds)
    {
        Set(ds, false);
    }
    public void Table(DataSet ds)
    {
        Table(ds, false);
    }
    public void Row(DataSet ds)
    {
        Row(ds, false);
    }
    public void Table(DataTable dt)
    {
        Table(dt, false);
    }
    public void Row(DataTable dt)
    {
        Row(dt, false);
    }
    public void Set(DataSet ds, bool WithException)
    {
        JArray arr = new JArray();
        if (!IsEmpty(ds))
        {
            foreach (DataTable dt in ds.Tables)
                arr.Add(TableToArray(dt));
            finish(arr);
        }
        else
            Empty(WithException);
    }
    public void Table(DataSet ds, bool WithException)
    {
        if (!IsEmpty(ds))
            finish(TableToArray(ds.Tables[0]));
        else
            Empty(WithException);
    }
    public void Row(DataSet ds, bool WithException)
    {
        if (!IsEmpty(ds))
            finish(RowToJSON(ds.Tables[0]));
        else
            Empty(WithException);
    }
    public void Table(DataTable dt, bool WithException)
    {
        if (!IsEmpty(dt))
            finish(TableToArray(dt));
        else
            Empty(WithException);
    }
    public void Row(DataTable dt, bool WithException)
    {
        if (!IsEmpty(dt))
            finish(RowToJSON(dt));
        else
            Empty(WithException);
    }
    /*DataBase*/
    private DataSet procDB()
    {
        addLevel();
        Dictionary<string, object> newAtts = AddAt();
        string[] keys = newAtts.Keys.ToArray();
        object[] values = newAtts.Values.ToArray();
        DataSet ds = init(procName, keys, values, true);
        clear();
        return ds;
    }
    private DataSet DB(string Quary, string[] names, object[] values, bool IsStoredProcedure)
    {
        string CS = ConfigurationManager.ConnectionStrings[Online ? OnlineConnection : LocalConnection].ConnectionString;
        SqlConnection con = new SqlConnection(CS);
        SqlCommand cmd = new SqlCommand(Quary, con);
        cmd.CommandType = IsStoredProcedure ? CommandType.StoredProcedure : CommandType.Text;
        con.Open();
        for (int i = 0; i < Math.Min(names.Length, values.Length); ++i)
            cmd.Parameters.AddWithValue(names[i], values[i].ToString());
        DataSet ds = new DataSet();
        new SqlDataAdapter(cmd).Fill(ds);
        con.Close();
        return ds;
    }
}