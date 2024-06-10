"val" @keyword.construct
"var" @keyword.construct
"object" @keyword.construct
"class" @keyword.construct
"trait" @keyword.construct
"package" @keyword.construct
"import" @keyword.construct
"def" @keyword.construct
"extension" @keyword.construct
"type" @keyword.construct

(class_definition
	"case" @keyword.construct
)
(case_clause
	"case" @keyword.condition
)
(object_definition
	"case" @keyword.construct
)

(for_expression
	"for" @keyword.condition
	"yield" @keyword.condition
)

(if_expression
	"if" @keyword.condition
	"else" @keyword.condition
)

"then" @keyword.condition

"sealed" @keyword.modifier
"extends" @keyword.modifier
(access_modifier
	"private" @keyword.modifier
)
(modifiers
	"final" @keyword.modifier
)
(modifiers "override" @keyword.modifier)
(modifiers
	"lazy" @keyword.modifier
)
(modifiers "implicit" @keyword.modifier)

"using" @keyword.construct

"new" @operator

(lambda_expression
	"=>" @operator
)

(block "{" @bracket)
(block "}" @bracket)
(case_block "{" @bracket)
(case_block "}" @bracket)
(template_body "{" @bracket)
(template_body "}" @bracket)

(comment) @comment
(block_comment) @comment

(string) @string

(interpolated_string_expression
	(interpolated_string) @string
)

(interpolated_string_expression
	interpolator: (identifier) @identifier.function
)

(boolean_literal) @value.boolean

(type_identifier) @identifier.type

(integer_literal) @value.number

(object_definition
	name: (identifier) @definition.type
)

(class_definition
	name: (identifier) @definition.class
)

(call_expression
	function: (identifier) @identifier.function
)

(call_expression
	function: (field_expression
		field: (identifier) @identifier.function
	)
)

(generic_function
	function: (field_expression
		field: (identifier)	@identifier.function
	)	
)

(field_expression
	field: (identifier) @identifier.property
)

(function_declaration
	name: (identifier) @definition.function
)

(package_clause
	name: (package_identifier) @definition.package
)

(type_parameters
	name: (identifier) @definition.type
)

(infix_expression
	operator: (operator_identifier) @operator
)

(enum_definition
	"enum" @keyword.construct
	name: (identifier) @definition.union
)

(enum_case_definitions
	"case" @keyword.construct
)

(full_enum_case
	name: (identifier) @definition.class
)
