
/**
 * Simulated MySQL Database Service
 * 
 * In a real application, this would be a connection to MySQL
 * using Node.js, Express, and a MySQL client library.
 * 
 * For the purposes of this sample, we're simulating database
 * operations with local data and timeouts.
 */

import { ImportTransaction, ExportTransaction, Partner } from "./api-service";

// Simulated database tables structure
interface Database {
  imports: ImportTransaction[];
  exports: ExportTransaction[];
  partners: {
    suppliers: Partner[];
    customers: Partner[];
    logistics: Partner[];
  };
  trade_summary: {
    totalImports: number;
    totalExports: number;
    tradeBalance: number;
    yearToDateGrowth: number;
  };
  trade_monthly: {
    month: string;
    imports: number;
    exports: number;
  }[];
}

// Sample SQL queries that would be executed in a real database
export const sampleQueries = {
  createTables: `
    -- Create imports table
    CREATE TABLE imports (
      id VARCHAR(20) PRIMARY KEY,
      date DATE NOT NULL,
      supplier VARCHAR(100) NOT NULL,
      product VARCHAR(100) NOT NULL,
      quantity INT NOT NULL,
      value DECIMAL(15, 2) NOT NULL,
      status ENUM('pending', 'completed', 'cancelled') NOT NULL,
      country VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    -- Create exports table
    CREATE TABLE exports (
      id VARCHAR(20) PRIMARY KEY,
      date DATE NOT NULL,
      customer VARCHAR(100) NOT NULL,
      product VARCHAR(100) NOT NULL,
      quantity INT NOT NULL,
      value DECIMAL(15, 2) NOT NULL,
      status ENUM('pending', 'completed', 'cancelled') NOT NULL,
      country VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    -- Create partners table
    CREATE TABLE partners (
      id VARCHAR(20) PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      country VARCHAR(50) NOT NULL,
      category VARCHAR(50) NOT NULL,
      rating DECIMAL(2, 1) NOT NULL,
      status ENUM('active', 'inactive', 'pending') NOT NULL,
      since YEAR NOT NULL,
      contact_email VARCHAR(100) NOT NULL,
      contact_phone VARCHAR(50) NOT NULL,
      contact_address TEXT NOT NULL,
      partner_type ENUM('supplier', 'customer', 'logistics') NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    -- Create trade_summary table
    CREATE TABLE trade_summary (
      id INT PRIMARY KEY AUTO_INCREMENT,
      total_imports DECIMAL(15, 2) NOT NULL,
      total_exports DECIMAL(15, 2) NOT NULL,
      trade_balance DECIMAL(15, 2) NOT NULL,
      ytd_growth DECIMAL(5, 2) NOT NULL,
      calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Create trade_monthly table
    CREATE TABLE trade_monthly (
      id INT PRIMARY KEY AUTO_INCREMENT,
      month VARCHAR(10) NOT NULL,
      imports DECIMAL(15, 2) NOT NULL,
      exports DECIMAL(15, 2) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `,
  
  getImports: `
    SELECT * FROM imports 
    WHERE 
      product LIKE ? OR 
      supplier LIKE ? OR 
      country LIKE ? OR 
      id LIKE ?
    ORDER BY date DESC;
  `,
  
  getExports: `
    SELECT * FROM exports 
    WHERE 
      product LIKE ? OR 
      customer LIKE ? OR 
      country LIKE ? OR 
      id LIKE ?
    ORDER BY date DESC;
  `,
  
  getPartners: `
    SELECT 
      id, name, country, category, rating, status, since,
      contact_email, contact_phone, contact_address 
    FROM partners 
    WHERE 
      partner_type = ? AND
      (name LIKE ? OR category LIKE ? OR country LIKE ?)
    ORDER BY name ASC;
  `,
  
  getDashboardData: `
    -- Get monthly trade data
    SELECT month, imports, exports FROM trade_monthly ORDER BY id ASC;
    
    -- Get trade summary
    SELECT total_imports, total_exports, trade_balance, ytd_growth 
    FROM trade_summary ORDER BY calculated_at DESC LIMIT 1;
    
    -- Get top import partners
    SELECT 
      country, 
      SUM(value) as total_value,
      (SUM(value) / (SELECT SUM(value) FROM imports)) * 100 as percentage,
      5 as trend 
    FROM imports 
    GROUP BY country 
    ORDER BY total_value DESC 
    LIMIT 5;
    
    -- Get top export partners
    SELECT 
      country, 
      SUM(value) as total_value,
      (SUM(value) / (SELECT SUM(value) FROM exports)) * 100 as percentage,
      2 as trend 
    FROM exports 
    GROUP BY country 
    ORDER BY total_value DESC 
    LIMIT 5;
    
    -- Get recent transactions
    (SELECT 
      id, 'import' as type, date, product, value, status, country
    FROM imports ORDER BY date DESC LIMIT 3)
    UNION
    (SELECT 
      id, 'export' as type, date, product, value, status, country
    FROM exports ORDER BY date DESC LIMIT 3)
    ORDER BY date DESC
    LIMIT 5;
  `,
  
  addImport: `
    INSERT INTO imports 
      (id, date, supplier, product, quantity, value, status, country) 
    VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?);
  `,
  
  addExport: `
    INSERT INTO exports 
      (id, date, customer, product, quantity, value, status, country) 
    VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?);
  `
};

// Export the sample queries for education purposes
export default sampleQueries;
