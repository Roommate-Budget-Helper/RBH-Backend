# RBH-Backend
Back-end application for Roommate Budget Helper


#HOW TO create a DATABASE mirror and load the schema with data:
  1. Download and install the Microsoft SSMS studio(https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15) or Visual Studio with Sql database package. (https://visualstudio.microsoft.com/downloads/)
  2. Clone the .bacpac file from git to local.
  3. Run SSMS/VS and create a database with DBname "Roommate". Config the auth and storage features as you wish.
  4. Select the database and rightclick, choose task->Upgrade Data-Tier App and you will see its Wizard pop up.
  5. Click next and select your local DAC package then click next. 
  6. Config the option section according to you own database/server setup(Normally the default setup works fine)
