package com.eventos.application.usecases;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.ArrayList;
import java.util.Optional;

import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import com.eventos.application.ports.input.StudentInputPort;
import com.eventos.application.ports.output.StudentOutputPort;
import com.eventos.model.Student;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Cell;

import jakarta.transaction.Transactional;


@Service
public class StudentUseCase implements StudentInputPort {

    private final StudentOutputPort studentOutputPort;

    public StudentUseCase(StudentOutputPort studentOutputPort) {
        this.studentOutputPort = studentOutputPort;
    }

    @Override
    @Transactional
    public List<Student> uploadStudentsFromExcel(InputStream excelFile) throws IOException {
        List<Student> students = new ArrayList<>();

        try (Workbook workbook = new XSSFWorkbook(excelFile)) {
            Sheet sheet = workbook.getSheetAt(0);
            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // Skip header row

                Student student = parseStudentFromRow(row);
                validateStudent(student);
                
                if (studentOutputPort.existsById(student.getIdentityDocument())) {
                    throw new IllegalArgumentException ("El estudiante ya existe: " + student.getIdentityDocument());
                }

                students.add(studentOutputPort.saveStudent(student));
            }
        }
        return students;
    }

    private Student parseStudentFromRow(Row row) {
        return new Student(
            getCellStringValue(row.getCell(0)),  // identityDocument
            getCellStringValue(row.getCell(1)),  // name
            getCellStringValue(row.getCell(2)),  // lastName
            getCellStringValue(row.getCell(3)),  // email
            getCellStringValue(row.getCell(4)),  // documentType
            getCellStringValue(row.getCell(5)),  // semester
            getCellStringValue(row.getCell(6)),  // universityId
            getCellStringValue(row.getCell(7)),  // address
            getCellStringValue(row.getCell(8))   // phoneNumber
        );
    }

    private String getCellStringValue(Cell cell) {
        if (cell == null) return null;
        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue().trim();
            case NUMERIC -> String.valueOf((int) cell.getNumericCellValue());
            default -> "";
        };
    }

    @Override
    @Transactional
    public Student createStudent(Student student) {
        validateStudent(student);
        
        if (studentOutputPort.existsById(student.getIdentityDocument())) {
            throw new IllegalArgumentException("Documento ya registrado: " + student.getIdentityDocument());
        }
        
        return studentOutputPort.saveStudent(student);
    }

    @Override
    public Optional<Student> getStudentById(String identityDocument) {
        return studentOutputPort.getStudentById(identityDocument);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentOutputPort.getAllStudents();
    }

    @Override
    @Transactional
    public void updateStudent(String identityDocument, Student student) {
        Student existingStudent = studentOutputPort.getStudentById(identityDocument)
            .orElseThrow(() -> new IllegalArgumentException("Estudiante no encontrado: " + identityDocument));
        
        validateStudent(student);
        
        existingStudent.setName(student.getName());
        existingStudent.setLastName(student.getLastName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setDocumentType(student.getDocumentType());
        existingStudent.setSemester(student.getSemester());
        existingStudent.setUniversityId(student.getUniversityId());
        existingStudent.setAddress(student.getAddress());
        existingStudent.setPhoneNumber(student.getPhoneNumber());
        
        studentOutputPort.saveStudent(existingStudent);
    }

    private void validateStudent(Student student) {
        if (student.getIdentityDocument() == null || student.getIdentityDocument().isBlank()) {
            throw new IllegalArgumentException("El documento de identidad no puede estar vacío");
        }
        
        if (student.getSemester() != null && !student.getSemester().matches("^[0-9]{1,2}$")) {
            throw new IllegalArgumentException("Semestre inválido: " + student.getSemester());
        }
        
        if (student.getPhoneNumber() != null && !student.getPhoneNumber().matches("^\\+?[0-9]{10,15}$")) {
            throw new IllegalArgumentException("Formato de teléfono inválido");
        }
    }
}
