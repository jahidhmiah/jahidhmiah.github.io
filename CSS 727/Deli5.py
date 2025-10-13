#This file contains all server interactions 

#the insert class contains all methods that insert new data into the database
class insert:
    def __init__(self):
        pass
    
    @staticmethod
    def User(cursor, conn, UserDict):
        query = "INSERT INTO Users (FirstName, LastName, Email, UserPassword, PhoneNumber, UserAddress, BirthDate) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        values = (
            UserDict["First Name"], 
            UserDict["Last Name"], 
            UserDict["Email"],
            UserDict["UserPassword"],
            UserDict["Phone Number"],
            UserDict["Mailing Address"],
            UserDict["Birth Date"])

        cursor.execute(query, values)
        conn.commit()

    @staticmethod
    def Experiences(cursor, conn, ExperienceDict): 
        query = """
            INSERT INTO Experiences
            (UserID, OrganizationID, Title, EmploymentType, StartDate, EndDate, ExperienceLocation, LocationType, ExperienceDescription)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);
            """
        values = (
            ExperienceDict["UserID"],
            ExperienceDict["OrganizationID"],
            ExperienceDict["Title"],
            ExperienceDict["EmploymentType"],
            ExperienceDict["StartDate"],
            ExperienceDict["EndDate"],
            ExperienceDict["ExperienceLocation"],
            ExperienceDict["LocationType"],
            ExperienceDict["ExperienceDescription"]
        )
        cursor.execute(query, values)
        conn.commit()
    
    @staticmethod
    def Education(cursor, conn, EducationDict):
        query = """
            INSERT INTO Education
            (UserID, OrganizationID, Degree, FieldOfStudy, StartDate, EndDate, Grade, ActivitiesAndSocieties, Education_Description)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);
        """
        values = (
            EducationDict["UserID"],
            EducationDict["OrganizationID"],
            EducationDict["Degree"],
            EducationDict["FieldOfStudy"],
            EducationDict["StartDate"],
            EducationDict["EndDate"],
            EducationDict["Grade"],
            EducationDict["ActivitiesAndSocieties"],
            EducationDict["Education_Description"]
        )
        cursor.execute(query, values)
        conn.commit()

    @staticmethod
    def Certifications(cursor, conn, CertificationDict):
        query = """
            INSERT INTO Certifications
            (UserID, OrganizationID, CertificationName, IssueDate, ExpirationDate, CredentialID, CredentialURL)
            VALUES (%s, %s, %s, %s, %s, %s, %s);
        """
        values = (
            CertificationDict["UserID"],
            CertificationDict["OrganizationID"],
            CertificationDict["CertificationName"],
            CertificationDict["IssueDate"],
            CertificationDict["ExpirationDate"],
            CertificationDict["CredentialID"],
            CertificationDict["CredentialURL"]
        )
        cursor.execute(query, values)
        conn.commit()

    @staticmethod
    def Organizations(cursor, conn, OrganizationDict):
        query = """
        INSERT INTO Organizations
        (OrganizationName, OrganizationType, Website, PhoneNumber, Industry, CompanySize, Headquarter, Founded)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
        """

        values = (
            OrganizationDict["OrganizationName"],
            OrganizationDict["OrganizationType"],
            OrganizationDict["Website"],
            OrganizationDict["PhoneNumber"],
            OrganizationDict["Industry"],
            OrganizationDict["CompanySize"],
            OrganizationDict["Headquarter"],
            OrganizationDict["Founded"]
        )
        cursor.execute(query, values)
        conn.commit()

#the get class contains all methods that retrieve data from the database
class get:
    def __init__(self):
        pass
    
    def QueryDict(cursor, query, params=None): 

        cursor.execute(query, params or ()) 
        columns = [desc[0] for desc in cursor.description] 
        
        return [dict(zip(columns, row)) for row in cursor.fetchall()]
    
    @staticmethod
    def UserID(cursor,email):
        cursor.execute("SELECT UserID FROM Users WHERE Email = %s;", (email,))
        return cursor.fetchone()

    @staticmethod
    def Password(cursor, email):
        cursor.execute("SELECT UserPassword FROM Users WHERE Email = %s;", (email,))
        return cursor.fetchone() 

    @staticmethod   
    def User(cursor, UserID, Bypass = False):
        query = f"""
            SELECT 
            UserID, FirstName, LastName, Email, PhoneNumber, UserAddress, BirthDate {", UserPassword" if Bypass else ""}
            FROM Users
            WHERE UserID = %s;
                """
        return get.QueryDict(cursor, query, (UserID,))  

    @staticmethod
    def Users(cursor, searcher = None):
        if searcher is None:
            query = """
                SELECT 
                UserID, FirstName, LastName, Email, PhoneNumber, UserAddress, BirthDate
                FROM Users;
                    """
            return get.QueryDict(cursor, query)
        else: 
            pattern = f"%{searcher}%"
            values = (pattern, pattern, pattern, pattern)
            query = """
                SELECT 
                UserID, FirstName, LastName, Email, PhoneNumber, UserAddress, BirthDate
                FROM Users
                WHERE LOWER(FirstName) LIKE LOWER(%s)
                    OR LOWER(LastName) LIKE LOWER(%s)
                    OR LOWER(Email) LIKE LOWER(%s)
                    OR LOWER(CONCAT(FirstName, ' ', LastName)) LIKE LOWER(%s);
                    """
            return get.QueryDict(cursor, query, values)
    
    @staticmethod
    def Education(cursor, UserID):
        query = """
            SELECT ed.*, o.OrganizationName, o.Headquarter
            FROM Education ed 
            LEFT JOIN Organizations o ON ed.OrganizationID = o.OrganizationID 
            WHERE UserID = %s
            ORDER BY StartDate;
            """
        return  get.QueryDict(cursor, query, (UserID,))      

    @staticmethod
    def Experiences(cursor, UserID):
        query = """
            SELECT ex.*, o.OrganizationName, o.Headquarter
            FROM Experiences ex 
            LEFT JOIN Organizations o ON ex.OrganizationID = o.OrganizationID 
            WHERE UserID = %s
            ORDER BY StartDate;
            """
        return  get.QueryDict(cursor, query, (UserID,))

    @staticmethod
    def Certs(cursor, UserID): 
        query = """
            SELECT c.*, o.OrganizationName
            FROM Certifications c
            LEFT JOIN Organizations o ON c.OrganizationID = o.OrganizationID 
            WHERE UserID = %s;
            """
        return  get.QueryDict(cursor, query, (UserID,))

    @staticmethod
    def Organizations(cursor, searcher = None):
        
        if searcher is None:
            query = """
            SELECT *
            FROM Organizations;
            """
            return  get.QueryDict(cursor, query)    
        else:
            pattern = f"%{searcher}%"
            values = (pattern, pattern)
            query = """
            SELECT *
            FROM Organizations
            WHERE LOWER(Website) LIKE LOWER(%s)
            OR LOWER(OrganizationName) LIKE LOWER(%s);
            """
            return get.QueryDict(cursor, query, values)

    def Jobs(cursor, searcher = None):

        if searcher is None:
            query = """
            SELECT *
            FROM Jobs;
            """
            return  get.QueryDict(cursor, query)  

        else:
            pattern = f"%{searcher}%"
            values = (pattern, pattern, pattern)
            query = """
            SELECT o.OrganizationName, Jobs.*, o.Website
            FROM Jobs
            LEFT JOIN Organizations o
            ON Jobs.OrganizationID = o.OrganizationID
            WHERE LOWER(o.OrganizationName) LIKE LOWER(%s)
            OR LOWER(Title) LIKE LOWER(%s)
            OR LOWER(o.Website) LIKE LOWER(%s);
            """
            return get.QueryDict(cursor, query, values)

#the update class contains all methods that update data in the database
class update:

    def __init__(self):
        pass
    
    @staticmethod
    def Experiences(cursor, conn, ExperienceDict): 
        query = """
            UPDATE Experiences
            SET
                UserID = %s,
                OrganizationID = %s,
                Title = %s,
                EmploymentType = %s,
                Current = %s,
                StartDate = %s,
                EndDate = %s,
                ExperienceLocation = %s,
                LocationType = %s,
                ExperienceDescription = %s
            WHERE ExperienceID = %s;
            """

        values = (
        ExperienceDict["UserID"],
        ExperienceDict["OrganizationID"],
        ExperienceDict["Title"],
        ExperienceDict["EmploymentType"],
        ExperienceDict["Current"],
        ExperienceDict["StartDate"],
        ExperienceDict["EndDate"],
        ExperienceDict["ExperienceLocation"],
        ExperienceDict["LocationType"],
        ExperienceDict["ExperienceDescription"],
        ExperienceDict["ExperienceID"])

        cursor.execute(query, values)
        conn.commit()
        print("\nExperience Updated!\n")
    
    @staticmethod
    def Education(cursor, conn, EducationDict):
        query = """
            UPDATE Education
            SET
                UserID = %s,
                OrganizationID = %s,
                Degree = %s,
                FieldOfStudy = %s,
                StartDate = %s,
                EndDate = %s,
                Grade = %s,
                ActivitiesAndSocieties = %s,
                Education_Description = %s
            WHERE EducationID = %s;
            """
        values = (
            EducationDict["UserID"],
            EducationDict["OrganizationID"],
            EducationDict["Degree"],
            EducationDict["FieldOfStudy"],
            EducationDict["StartDate"],
            EducationDict["EndDate"],
            EducationDict["Grade"],
            EducationDict["ActivitiesAndSocieties"],
            EducationDict["Education_Description"],
            EducationDict["EducationID"],  
        )
        cursor.execute(query, values)
        conn.commit()
        print("\nEducation Updated!\n")

    @staticmethod
    def Certs(cursor, conn, CertificationDict):
        query = """
            UPDATE Certifications
            SET
                UserID = %s,
                OrganizationID = %s,
                CertificationName = %s,
                IssueDate = %s,
                ExpirationDate = %s,
                CredentialID = %s,
                CredentialURL = %s
            WHERE CertificationID = %s;
        """
        values = (
            CertificationDict["UserID"],
            CertificationDict["OrganizationID"],
            CertificationDict["CertificationName"],
            CertificationDict["IssueDate"],
            CertificationDict["ExpirationDate"],
            CertificationDict["CredentialID"],
            CertificationDict["CredentialURL"],
            CertificationDict["CertificationID"],
        )
        cursor.execute(query, values)
        conn.commit()
        print("\nCert Updated!\n")

    @staticmethod
    def Users(cursor, conn, UserDict):
        query = """
            UPDATE Users
            SET
                FirstName = %s,
                LastName = %s,
                Email = %s,
                UserPassword = %s,
                PhoneNumber = %s,
                UserAddress = %s,
                BirthDate = %s
            WHERE UserID = %s;
        """
        values = (
            UserDict["FirstName"],
            UserDict["LastName"],
            UserDict["Email"],
            UserDict["UserPassword"],
            UserDict["PhoneNumber"],
            UserDict["UserAddress"],
            UserDict["BirthDate"],
            UserDict["UserID"],
        )
        cursor.execute(query, values)
        conn.commit()
        print("\nUser Updated\n")

#the delete class contains all methods that delete data in the database
class delete:

    def __init__(self):
        pass
    
    @staticmethod
    def Experiences(cursor, conn, ExperienceDict):
        query = "DELETE FROM Experiences WHERE ExperienceID = %s;"
        cursor.execute(query, (ExperienceDict["ExperienceID"],))
        conn.commit()

    @staticmethod
    def Education(cursor, conn, EducationDict):
        query = "DELETE FROM Education WHERE EducationID = %s;"
        cursor.execute(query, (EducationDict["EducationID"],))
        conn.commit()

    @staticmethod
    def Certs(cursor, conn, CertificationDict):
        query = "DELETE FROM Certifications WHERE CertificationID = %s;"
        cursor.execute(query, (CertificationDict["CertificationID"],))
        conn.commit()

    @staticmethod
    def Users(cursor, conn, UserDict):
        query = "DELETE FROM Users WHERE UserID = %s;"
        cursor.execute(query, (UserDict["UserID"],))
        conn.commit()


